const rooms = [];


const add_user_to = ({ user, room, socketId }) => {
    if (!rooms.find(room => room.player == user)) {
        rooms.push({ name: room, player: user, socketId });
    } else {
        rooms[rooms.findIndex(r => r.player == user)].socketId = socketId;
    }
    console.log(rooms)
}


const remove_user = (socketId) => {
    const index = rooms.findIndex(room => {
        return room.socketId == socketId;
    });
    if (index > -1) {
        rooms.splice(index, 1);
    }
    console.log(socketId + " removed")
}

const user_exists_in = (room) => {

}

const room_exists = ({ room }) => {
    console.log(rooms.some(r => r.name == room))
    return rooms.some(r => r.name == room);
}


const get_users_of = ({ room }) => {
    return rooms.filter(r => {
        return r.name == room;
    })
}


module.exports = {
    add_user_to,
    remove_user,
    user_exists_in,
    get_users_of,
    room_exists
}