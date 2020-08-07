const Socket = new (require('../Sockets'))
const Game = Socket.io.of('/game')

Game.on('connection', (socket) => {
    socket.on('newPlayer', () => {
        if (Socket.checkIfAvailableRoom()) {
            Socket.addToRoom(socket, Socket.findAvailableRoom().roomKey)
        } else {
            Socket.createRoom(socket)
        }
    })

    socket.on('start', (x, y) => {
        const room = Socket.findRoomByUserId(socket.id)
        room.gameMaster.loadBoard(x, y)
        Game.to(room.roomKey).emit('board', room.getGameObj())
    })

    socket.on('refresh', () => {
        const room = Socket.findRoomByUserId(socket.id)
        Game.to(room.roomKey).emit('board', room.getGameObj())
    })

    socket.on('move', (direction) => {
        const room = Socket.findRoomByUserId(socket.id)
        const player = Socket.findPlayerNum(socket.id)
        room.gameMaster.movePlayer(player, direction)
        Game.to(room.roomKey).emit('board', room.getGameObj())
    })
})