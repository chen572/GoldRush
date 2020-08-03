import './helpers/HandlebarsHelpers.js'
export class Renderer {
    constructor() {
        this.gameBoardTemplate = Handlebars.compile($('#game-board-template').html())
    }

    renderBoard = (matrix) => {
        const Html = this.gameBoardTemplate({ row: matrix })
        $('.game-area').append(Html)
    }
}