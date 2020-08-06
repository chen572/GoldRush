export class GameManager {
    constructor() {
        this.gameBoard = []
    }

    async initGameBoard(x, y) { this.gameBoard = await $.get(`/board?state=new&x=${x}&y=${y}`) }

    async refreshGameBoard() { this.gameBoard = await $.get('/board?state=old') }
}