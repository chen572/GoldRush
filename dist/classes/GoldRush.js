import { Matrix } from './Matrix.js'

export class GoldRush extends Matrix {
    constructor() {
        super()
        this.player1 = { x: 0, y: 0, num: 1, Px: 0, Py: 0, score: 0 }
        this.player2 = { x: 4, y: 4, num: 2, Px: 4, Py: 4, score: 0 }
        this.rightBound = 4
        this.topBound = 0
        this.leftBound = 0
        this.bottomBound = 4
        this.coins = []
    }

    loadBoard = () => {
        this.matrix = this.generateMatrix(5, 5)
        this.alter(0, 0, 1)
        this.alter(4, 4, 2)
        this.addCoins()
    }

    addCoins = () => {
        for (let i = 0; i < this.matrix.length * 2; i++) {
            this.createCoins()
        }
    }

    createCoins = () => {
        let posX = Math.floor(Math.random() * 4)
        let posY = Math.floor(Math.random() * 4)
        if (this.get(posY, posX) !== '.') { return this.createCoins() }
        this.alter(posY, posX, 'c')
        this.coins.push({ posX, posY })
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
        if (direction === 'down' && player.y !== this.bottomBound) { return player.y++ }
        else if (direction === 'up' && player.y !== this.topBound) { return player.y-- }
        else if (direction === 'left' && player.x !== this.leftBound) { return player.x-- }
        else if (direction === 'right' && player.x !== this.rightBound) { return player.x++ }
        else { return }
    }

    checkForCoins = (player) => {
        const coin = this.findInCoinsArr(player.x, player.y)
        if (coin) {
            player.score += 10
            this.coins.splice(this.coins.indexOf(coin), 1)
        }
    }

    findInCoinsArr = (x, y) => this.coins.find(c => c.posX === x && c.posY === y)
}