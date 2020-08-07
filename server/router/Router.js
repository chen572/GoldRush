const express = require('express')
const router = express.Router()
const GoldRush = require('../matrixLogic/GoldRush')
const board = new GoldRush()

router.get('/', (req, res) => {
    res.send(board.matrix)
})

router.post('/', async (req, res) => {
    const { x, y } = req.query
    await board.loadBoard(x, y)
    res.send(board.matrix)
})

router.put('/', (req, res) => {
    const { player, direction } = req.query
    board.movePlayer(player, direction)
    res.send(board.objForRes(board.checkForWin()))
})

module.exports = router