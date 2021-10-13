const rooms = [];
const axios = require('axios').default;
const API_ENDPOINT = "http://localhost:8000/api";


const get_color = ({ room }) => {
    const userCount = get_users_of({ room }).length;

    if (userCount == 0) return 'blue';
    if (userCount == 1) return 'green';
    if (userCount == 2) return 'red';
    if (userCount == 3) return 'yellow';
}

const add_user_to = ({ user, room, socketId }) => {
    if (!rooms.find(room => room.player == user)) {
        rooms.push({ name: room, player: user, socketId, color: get_color({ room }) });
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
    console.log(socketId + " removed", rooms)
}

const user_exists_in = (room) => {

}

const room_exists = ({ room }) => {
    console.log(rooms.some(r => r.name == room))
    axios.post(`${API_ENDPOINT}/get-game-status`, {
        room_name: room
    })
        .then(response => {
            if (response.game_status == 4 || response.game_status != 2) {
                return false;
            } else {
                return true;
            }
        })
}

const room_exists_local = ({ room }) => {
    return rooms.some(r => r.name == room);
}


const get_users_of = ({ room }) => {
    // const tempUsers = [];
    return rooms.filter(r => {
        return r.name == room;
    })
    // .forEach(room => tempUsers.push(room.player))

    // return tempUsers;
}

const room_of = ({ socketId }) => {
    console.log(rooms.filter(room => room.socketId == socketId), socketId, rooms)
    // return rooms.filter(room => room.socketId == socketId)[0].name;
}

const game_started = ({ room }) => {
    axios.post(`${API_ENDPOINT}/get-game-status`, {
        room_name: room
    })
        .then(response => {
            if (response.game_status == 1) {
                return true;
            } else {
                return false;
            }
        })
}

const get_all_room = () => rooms;

module.exports = {
    add_user_to,
    remove_user,
    user_exists_in,
    get_users_of,
    room_exists,
    room_of,
    game_started,
    get_all_room,
    room_exists_local
}