const express = require('express')
const router = express.Router()
const { GoldRush, keyMap } = require('../matrixLogic/GoldRush')
const gR = new GoldRush()

router.get('/board', async (req, res) => {
    const { state, x, y } = req.query
    if (state === 'new') { await gR.loadBoard(x, y) }
    res.send(gR.matrix)
})

module.exports = router