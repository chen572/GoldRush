const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()


const app = express()
// const server = require('http').createServer()
// const io = require('socket.io')(server, {})
const Socket = new (require('./server/Sockets'))
const router = require('./server/router/Router')

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', router)

// app.get('/', (req, res) => {
//     // console.log(Socket.io.path())
//     res.end()
// })

// const roomKey = true
// Socket.io.on('connection', socket => {
//     roomKey ?
//         Socket.addToRoom(socket, roomKey)
//         :
//         Socket.createRoom(socket)
// })
// server.listen(3001)
const { PORT } = process.env
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
})

// console.log(io.sockets)