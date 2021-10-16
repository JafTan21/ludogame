const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const axios = require('axios').default;
const API_ENDPOINT = "http://localhost:8000/api";

const {
    crate_room,
    check_user_in_room,
    join_room_if_exists,
    send_updated_players,
    leave_room,
    remove_user_from_room
} = require('./room/roomHelper');

let socket_user = [];

const add_user = ({ user_id, socket_id }) => {
    socket_user = socket_user.filter(user => {
        return user.user_id != user_id;
    });
    socket_user.push({ user_id, socket_id });

    console.log(socket_user)
}

const remove_user = ({ socket_id }) => {
    socket_user = socket_user.filter(user => {
        return user.socket_id != socket_id;
    });

    console.log(socket_user)
}

io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);
    socket.on('disconnect', () => {
        remove_user({ socket_id: socket.id });
    });
    // connection
    socket.on('CONNECTION_REQUEST', ({ user_id }) => {
        add_user({ user_id, socket_id: socket.id });
        socket.emit('CONNECTION_REQUEST_ACCEPTED');
    });



    // create room
    socket.on('CREATE_ROOM', ({ room_name, entry_fee, user_id }) => {
        crate_room({ room_name, entry_fee, user_id }, ({ status, msg }) => {
            if (status == 1) { socket.emit('room_created'); return; }
            if (status == 0) { socket.emit('room_error', { msg }); return }
        });
    });



    // join room
    socket.on('JOIN_ROOM', ({ room_name, user_id }) => {
        join_room_if_exists({ room_name, user_id }, ({ status, msg }) => {
            if (status == 1) { socket.emit('room_joined'); return; }
            if (status == 0) { socket.emit('room_error', { msg }); return }
        });
    });
    // join from room page
    socket.on('CHECK_AND_JOIN', ({ room_name, user_id }) => {
        check_user_in_room({ room_name, user_id }, ({ status, msg }) => {
            if (status == 0) { socket.emit('room_error', { msg }); return; }

            socket.join(room_name);
            socket.emit('checked_and_room_joined');

            send_updated_players({ room_name }, ({ players }) => {
                io.to(room_name).emit('update_players', { players });
            });
        });
    });



    // leave room
    socket.on('LEAVE_ROOM', ({ room_name, user_id }) => {
        leave_room({ room_name, user_id }, () => {
            send_updated_players({ room_name }, ({ players }) => {
                io.to(room_name).emit('update_players', { players });
            });
        });
    });



    // start game



    // dice toss
    socket.on('TOSS', ({ user_id, result, room }) => {
        console.log(user_id, result)
        io.to(room).emit('user_tossed', { user_id, result });
    });

});



server.listen(5000, () => { console.log('listening on *:5000'); });
