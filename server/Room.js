class Room {
    constructor() {
        this.roomKey = this.getRoomKey()
        this.users = []
    }

    getRoomKey() {
        const abc = 'abcdefghijklmnopqrstuvwxyz123456789'.split('')
        let roomKey = ''
        for (let i = 0; i < 16; i++) {
            roomKey += abc[Math.floor(Math.random() * abc.length)]
        }
        return roomKey
    }
}

module.exports = Room