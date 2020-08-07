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

const init = async function () {
    const x = $('#colNum').val()
    const y = $('#rowNum').val()
    if (x && y) {
        GM = $('.remote').hasClass('click') ? remoteGM : new GameManager()
        await GM.initGameBoard(x, y)
        renderer.renderBoard(GM.gameBoard)
        return true
    }
    return false
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

$('.start-button').click(async () => {
    if (await init()) {
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