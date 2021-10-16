const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const { add_user_to,
    remove_user,
    get_users_of,
    game_started,
    entry_fee_of,
    room_exists_local
} = require('./room/roomHelper');
const axios = require('axios').default;
const API_ENDPOINT = "http://localhost:8000/api";


io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);
    socket.on('disconnect', (e) => {
        console.log(e, 'user left: ' + socket.id)
        remove_user(socket.id);
    });


    socket.on('create_room', ({ room }) => {
        socket.join(room);
        io.to(room).emit('send_created_room', { room });
    })

    socket.on('join_room', ({ user, room, asCreator, entry_fee }) => {


        if (!room_exists_local({ room }) && !asCreator) {
            socket.emit('room_not_found', {
                socketId: socket.id,
                socketIdFor: user
            });
            return;
        } else if (!asCreator) {
            entry_fee = entry_fee_of({ room });
        }


        if (game_started({ room })) {
            socket.emit('game_started');
            return;
        }

        if (get_users_of({ room }).length == 4) {
            socket.emit('room_full', {
                socketId: socket.id,
            });
            return;
        }



        socket.join(room);
        add_user_to({ user, room, socketId: socket.id, asCreator, entry_fee });
        io.to(room).emit('joined', {
            room,
            data: get_users_of({ room }),
            socketId: socket.id,
            socketIdFor: user,
            entry_fee
        });

        if (get_users_of({ room }).length == 4) {
            const users = get_users_of({ room });
            axios.post(`${API_ENDPOINT}/create-room`, {
                room_name: room,
                entry_fee: entry_fee,
                player_1: users[0].player,
                player_2: users[1].player,
                player_3: users[2].player,
                player_4: users[3].player,
            }).then(res => {
                io.to(room).emit('start_game');
            });
        }
    })

    // checking room
    // socket.on('check_room', ({ room, user }) => {
    //     if (!room_exists_local({ room })) {
    //         socket.emit('room_not_found', {
    //             socketIdFor: user
    //         });
    //         return;
    //     }
    // });

    // dice
    socket.on('toss', ({ user, dice, room }) => {
        console.log(user, dice)
        io.to(room).emit('toss_for_other', { tosser: user, dice });
    });

    socket.on('show_rooms', () => {
        //console.log(get_all_room())
    })

});



server.listen(5000, () => { console.log('listening on *:5000'); });


































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

const add_user_to = ({ user, room, socketId, asCreator, entry_fee }) => {
    if (!rooms.find(room => room.player == user)) {
        rooms.push({ name: room, player: user, socketId, color: get_color({ room }), asCreator, entry_fee });
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
const entry_fee_of = ({ room }) => {
    return rooms.filter(r => (r.name == room && r.asCreator))[0].entry_fee;
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
    room_exists_local,
    entry_fee_of
}