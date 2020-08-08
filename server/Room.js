const GoldRush = require('./matrixLogic/GoldRush')

class Room {
    constructor() {
        this.roomKey = this.getRoomKey()
        this.users = []
        this.gameMaster = new GoldRush()
    }

    getRoomKey() {
        const abc = 'abcdefghijklmnopqrstuvwxyz123456789'.split('')
        let roomKey = ''
        for (let i = 0; i < 16; i++) {
            roomKey += abc[Math.floor(Math.random() * abc.length)]
        }
        return roomKey
    }

    getGameObj() {
        return {
            board: this.gameMaster.matrix,
            playerOneScore: this.gameMaster.player1.score,
            playerTwoScore: this.gameMaster.player2.score,
            winner: this.gameMaster.checkForWin() ? this.gameMaster.getWinner() : null
        }
    }
}

module.exports = Room