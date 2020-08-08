const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()

const app = express()
const boardRouter = require('./server/router/Router')
require('./server/router/SocketsRouter')

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/board', boardRouter)

const { PORT } = process.env
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
})