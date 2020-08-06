import { Renderer } from './classes/Render.js'
import { GameManager } from './classes/GameManager.js'
const renderer = new Renderer()
const GM = new GameManager()
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

const init = async function () {
    const x = $('#colNum').val()
    const y = $('#rowNum').val()
    await GM.initGameBoard(x, y)
    renderer.renderBoard(GM.gameBoard)
}

// $(document).keypress(event => {
//     const [player, direction] = keyMap[event.key] || [1, 'none']
//     board.movePlayer(player, direction)
//     renderer.renderBoard(board.matrix)
//     renderer.renderScores(board.player1.score, board.player2.score)
//     console.log(board.coins)
//     if (board.checkForWin()) { renderer.renderEndScreen(board.getWinner()) }
// })

$('.start-button').click(() => {
    init()
    $('.menu').remove()
    $('.background-filter').remove()
})