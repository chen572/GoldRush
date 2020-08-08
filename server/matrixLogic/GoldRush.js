const Matrix = require('./Matrix')

class GoldRush extends Matrix {
    constructor() {
        super()
        this.player1 = { x: 0, y: 0, num: 1, Px: 0, Py: 0, score: 0 }
        this.player2 = { x: null, y: null, num: 2, Px: null, Py: null, score: 0 }
        this.rightBound = null
        this.topBound = 0
        this.leftBound = 0
        this.bottomBound = null
        this.coins = []
    }

    loadBoard = (x, y) => {
        this.matrix = this.generateMatrix(x, y)
        this.resetVars(x, y)
        this.alter(this.player1.x, this.player1.y, this.player1.num)
        this.alter(this.player2.x, this.player2.y, this.player2.num)
        this.addCoins()
        this.addObstacles()
    }

    resetVars = (x, y) => {
        this.player1 = { x: 0, y: 0, num: 1, Px: 0, Py: 0, score: 0 }
        this.player2 = { x: x - 1, y: y - 1, num: 2, Px: x - 1, Py: y - 1, score: 0 }
        this.rightBound = x - 1
        this.bottomBound = y - 1
        this.coins = []
    }

    addCoins = () => {
        for (let i = 0; i < this.matrix.length * 1.75; i++) {
            this.createCoins()
        }
    }

    createCoins = () => {
        let [posX, posY] = this.getRandomXnY()
        this.alter(posY, posX, 'c')
        this.coins.push({ posX, posY })
    }

    addObstacles = () => {
        for (let i = 0; i < this.matrix.length * 1.5; i++) {
            this.createObstacles()
        }
    }

    createObstacles = () => {
        let [posX, posY] = this.getRandomXnY()
        this.alter(posY, posX, 'x')
    }

    getRandomXnY = () => {
        let posX = Math.floor(Math.random() * this.rightBound)
        let posY = Math.floor(Math.random() * this.bottomBound)
        if (this.get(posY, posX) !== '.') { return this.getRandomXnY() }
        return [posX, posY]
    }

    movePlayer = (player, direction) => {
        player = player == 1 ? this.player1 : this.player2
        this.addToDirection(player, direction)
        this.alter(player.Py, player.Px, '.')
        this.alter(player.y, player.x, player.num)
        this.checkForCoins(player)
        player.Px = player.x; player.Py = player.y
    }

    addToDirection = (player, direction) => {
        if (direction === 'down' && player.y !== this.bottomBound && this.checkNextSpot(player.y + 1, player.x)) { return player.y++ }
        else if (direction === 'up' && player.y !== this.topBound && this.checkNextSpot(player.y - 1, player.x)) { return player.y-- }
        else if (direction === 'left' && player.x !== this.leftBound && this.checkNextSpot(player.y, player.x - 1)) { return player.x-- }
        else if (direction === 'right' && player.x !== this.rightBound && this.checkNextSpot(player.y, player.x + 1)) { return player.x++ }
        else { return false }
    }

    checkNextSpot = (y, x) => this.get(y, x) === '.' || this.get(y, x) === 'c'

    checkForCoins = (player) => {
        const coin = this.findInCoinsArr(player.x, player.y)
        if (coin) {
            player.score += 10
            this.coins.splice(this.coins.indexOf(coin), 1)
        }
    }

    objForRes = (gameOver) => ({
        board: this.matrix,
        score: {
            playerOne: this.player1.score,
            playerTwo: this.player2.score
        },
        winner: gameOver ? this.getWinner() : null
    })

    checkForWin = () => this.coins.length ? false : true

    getWinner = () => this.player1.score > this.player2.score ? 'Player1' : 'Player2'

    findInCoinsArr = (x, y) => this.coins.find(c => c.posX === x && c.posY === y)
}

module.exports = GoldRush