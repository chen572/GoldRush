import './helpers/HandlebarsHelpers.js'
export class Renderer {
    constructor() {
        this.gameBoardTemplate = Handlebars.compile($('#game-board-template').html())
    }

    renderBoard = (matrix) => {
        const Html = this.gameBoardTemplate({ row: matrix })
        $('.game-area').empty().append(Html)
    }

    renderScores = (playerOneScore, playerTwoScore) => {
        $('.player-1-score').text(playerOneScore)
        $('.player-2-score').text(playerTwoScore)
    }

    renderEndScreen = (winner) => {
        $('.game-area').empty().append(`<p>The Winner is ${winner}!</p>`)
    }
}