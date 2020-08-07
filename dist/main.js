import { toggleAnimation, keyMap } from './classes/helpers/FunctionHelpers.js'
import { Renderer } from './classes/Render.js'
import { GameManager } from './classes/GameManager.js'
const renderer = new Renderer()
const GM = new GameManager()
// const socket = io('http://localhost:3001')

// socket.on('test', data => {
//     console.log(data.test)
// })

$('.options').click(event => {
    toggleAnimation(event.currentTarget)
})

const init = async function () {
    const x = $('#colNum').val()
    const y = $('#rowNum').val()
    if (x && y) {
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