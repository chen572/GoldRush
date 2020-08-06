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
        console.log(this.rooms)
    }

    addToRoom(user, roomKey) {
        const room = this.rooms.find(r => r.roomKey === roomKey)
        user.join(room.roomKey)
        room.users.push(user)
        console.log(this.rooms)
    }
}

module.exports = Socket