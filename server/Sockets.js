const Room = require('./Room')

class Socket {
    constructor() {
        this.server = require('http').createServer().listen(3001)
        this.io = require('socket.io')(this.server)
        this.rooms = []
    }

    createRoom(user) {
        const room = new Room()
        user.join(room.roomKey)
        room.users.push(user)
        this.rooms.push(room)
    }

    addToRoom(user, roomKey) {
        const room = this.rooms.find(r => r.roomKey === roomKey)
        user.join(room.roomKey)
        room.users.push(user)
    }

    findRoomByUserId(socketID) { return this.rooms.find(r => r.users.find(u => u.id === socketID)) }

    findPlayerNum(socketID) { return this.findRoomByUserId(socketID).users.findIndex(u => u.id === socketID) + 1 }

    findAvailableRoom() { return this.rooms.find(r => r.users.length < 2) }

    checkIfAvailableRoom() {
        return this.findAvailableRoom()
    }
}

module.exports = Socket