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
        this.initVars(x, y)
        this.alter(this.player1.x, this.player1.y, this.player1.num)
        this.alter(this.player2.x, this.player2.y, this.player2.num)
        this.addCoins()
        this.addObstacles()
    }

    initVars = (x, y) => {
        this.player2.x = x - 1
        this.player2.Px = x - 1
        this.player2.y = y - 1
        this.player2.Py = y - 1
        this.rightBound = x - 1
        this.bottomBound = y - 1
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
        player = player === 1 ? this.player1 : this.player2
        this.addToDirection(player, direction)
        this.alter(player.Py, player.Px, '.')
        this.alter(player.y, player.x, player.num)
        this.checkForCoins(player)
        player.Px = player.x; player.Py = player.y
    }

    addToDirection = (player, direction) => {
        if (direction === 'down' && player.y !== this.bottomBound && this.get(player.y + 1, player.x) !== 'x') { return player.y++ }
        else if (direction === 'up' && player.y !== this.topBound && this.get(player.y - 1, player.x) !== 'x') { return player.y-- }
        else if (direction === 'left' && player.x !== this.leftBound && this.get(player.y, player.x - 1) !== 'x') { return player.x-- }
        else if (direction === 'right' && player.x !== this.rightBound && this.get(player.y, player.x + 1) !== 'x') { return player.x++ }
        else { return }
    }

    checkForCoins = (player) => {
        const coin = this.findInCoinsArr(player.x, player.y)
        if (coin) {
            player.score += 10
            this.coins.splice(this.coins.indexOf(coin), 1)
        }
    }

    checkForWin = () => this.coins.length ? false : true

    getWinner = () => this.player1.score > this.player2.score ? 'Player1' : 'Player2'

    findInCoinsArr = (x, y) => this.coins.find(c => c.posX === x && c.posY === y)
}

const keyMap =
{
    i: [1, 'up'],
    k: [1, 'down'],
    j: [1, 'left'],
    l: [1, 'right'],
    w: [2, 'up'],
    s: [2, 'down'],
    a: [2, 'left'],
    d: [2, 'right']
}

module.exports = { GoldRush, keyMap }