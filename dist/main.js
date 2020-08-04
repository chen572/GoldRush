import { Renderer } from './classes/Render.js'
import { GoldRush, keyMap } from './classes/GoldRush.js'
const renderer = new Renderer()
const board = new GoldRush(10, 10)

const init = function () {
    const x = $('#colNum').val()
    const y = $('#rowNum').val()
    board.loadBoard(x, y)
    renderer.renderBoard(board.matrix)
}

$(document).keypress(event => {
    const [player, direction] = keyMap[event.key] || [1, 'none']
    board.movePlayer(player, direction)
    renderer.renderBoard(board.matrix)
    renderer.renderScores(board.player1.score, board.player2.score)
    console.log(board.coins)
    if (board.checkForWin()) { renderer.renderEndScreen(board.getWinner()) }
})

$('.start-button').click(() => {
    init()
})