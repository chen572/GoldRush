import { Renderer } from './classes/Render.js'
import { GoldRush, keyMap } from './classes/GoldRush.js'
const renderer = new Renderer()
const board = new GoldRush(10, 10)
// const socket = io('http://localhost:3001')

// socket.on('test', data => {
//     console.log(data.test)
// })

$('.options').click(event => {
    $(event.currentTarget).toggleClass('click')
    if ($(event.currentTarget).hasClass('one-player')) { $('.two-player').removeClass('click') }
    if ($(event.currentTarget).hasClass('two-player')) { $('.one-player').removeClass('click') }
    if ($(event.currentTarget).hasClass('local')) { $('.remote').removeClass('click') }
    if ($(event.currentTarget).hasClass('remote')) { $('.local').removeClass('click') }
    if ($(event.currentTarget).hasClass('computer')) {
        $('.remote').removeClass('click')
        $('.two-player').removeClass('click')
        $('.local').addClass('click')
        $('.one-player').addClass('click')
    }
})

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