import { GameManager } from './GameManager.js'

export class RemoteGameManager extends GameManager {
    constructor() {
        super()
        this.socket = io('http://localhost:3001/game')
    }

    addRefreshGameBoardListener() {
        return new Promise((resolve, reject) => {
            this.socket.on('board', (gameObj) => {
                const { board, playerOneScore, playerTwoScore, winner } = gameObj
                this.gameBoard = board
                this.playerOneScore = playerOneScore
                this.playerTwoScore = playerTwoScore
                this.winner = winner
                resolve(board)
            })
        })
    }

    NewGame() { this.socket.emit('createRoom') }

    async findGame() {
        this.socket.emit('joinRoom')
        await this.addRefreshGameBoardListener()
        this.playing = true
    }

    initGameBoard(x, y) {
        return new Promise(async (resolve, reject) => {
            this.socket.emit('start', x, y)
            await this.addRefreshGameBoardListener()
            this.playing = true
            resolve()
        })
    }

    async movePlayer(player, direction) {
        return new Promise(async (resolve, reject) => {
            this.socket.emit('move', direction)
            this.socket.emit('refresh')
            resolve()
        })
    }
}