import { Renderer } from './classes/Render.js'
import { GoldRush } from './classes/GoldRush.js'
const renderer = new Renderer()
const board = new GoldRush(10, 10)
board.loadBoard()
renderer.renderBoard(board.matrix)