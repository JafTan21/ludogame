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
    room_exists,
    room_of,
    game_started,
    get_all_room,
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

    socket.on('join_room', ({ user, room, asCreator }) => {


        if (!room_exists_local({ room }) && !asCreator) {
            socket.emit('room_not_found', {
                socketId: socket.id,
                socketIdFor: user
            });
            return;
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
        add_user_to({ user, room, socketId: socket.id });
        io.to(room).emit('joined', {
            room,
            data: get_users_of({ room }),
            socketId: socket.id,
            socketIdFor: user
        });

        if (get_users_of({ room }).length == 4) {
            const users = get_users_of({ room });
            axios.post(`${API_ENDPOINT}/create-room`, {
                room_name: room,
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
