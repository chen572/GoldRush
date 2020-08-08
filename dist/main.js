import { toggleAnimation, keyMap } from './classes/helpers/FunctionHelpers.js'
import { Renderer } from './classes/Render.js'
import { GameManager } from './classes/GameManager.js'
import { RemoteGameManager } from './classes/RemoteGameManager.js'
const renderer = new Renderer()
const remoteGM = new RemoteGameManager()
let GM

$('.options').click(event => {
    toggleAnimation(event.currentTarget)
})

const init = async function (event) {
    const x = $('#colNum').val()
    const y = $('#rowNum').val()
    if (x && y) {
        GMinit(event)
        await GM.initGameBoard(x, y)
        renderer.renderBoard(GM.gameBoard)
        return true
    } else if ($(event.currentTarget).hasClass('find-button')) {
        GMinit(event)
        renderer.renderBoard(GM.gameBoard)
        return true
    }
    return false
}

const GMinit = (event) => {
    GM = $('.remote').hasClass('click') ? remoteGM : new GameManager()
    if (GM === remoteGM) {
        $(event.currentTarget).hasClass('start-button') ? GM.NewGame() : GM.findGame()
    }
}

$(document).keypress(async event => {
    if (GM.playing) {
        const [player, direction] = keyMap[event.key] || [1, 'none']
        await GM.movePlayer(player, direction)
        renderer.renderBoard(GM.gameBoard)
        renderer.renderScores(GM.playerOneScore, GM.playerTwoScore)
        if (GM.winner) { renderer.renderEndScreen(GM.winner) }
    }
})

$('.menu-button-container').on('click', '.start-button, .find-button', async (event) => {
    if (await init(event)) {
        $('.menu').remove()
        $('.background-filter').remove()
    }
})

remoteGM.socket.on('board', (gameObj) => {
    const { board, playerOneScore, playerTwoScore, winner } = gameObj
    GM.gameBoard = board
    GM.playerOneScore = playerOneScore
    GM.playerTwoScore = playerTwoScore
    GM.winner = winner
    renderer.renderBoard(GM.gameBoard)
    if (GM.winner) { renderer.renderEndScreen(GM.winner) }
})