export class GameManager {
    constructor() {
        this.gameBoard = []
        this.playing = false
        this.winner = null
        this.playerOneScore = 0
        this.playerTwoScore = 0
    }

    async initGameBoard(x, y) { this.gameBoard = await $.post(`/board?x=${x}&y=${y}`); this.playing = true }

    async addRefreshGameBoardListener() { this.gameBoard = await $.get('/board') }

    async movePlayer(player, direction) {
        const gameObj = await $.ajax({ url: `/board?player=${player}&direction=${direction}`, method: 'PUT' })
        gameObj.winner ?
            this.winner = gameObj.winner :
            this.gameBoard = gameObj.board
        this.playerOneScore = gameObj.score.playerOne
        this.playerTwoScore = gameObj.score.playerTwo
    }
}