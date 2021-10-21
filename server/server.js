const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
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
}

const remove_user = ({ socket_id }) => {
    socket_user = socket_user.filter(user => {
        return user.socket_id != socket_id;
    });

    console.log(socket_user)
}

const getNextTosser = ({ current, result }) => {
    if (result == 6) {
        return current;
    }
    if (current == 'blue') {
        return 'yellow';
    }
    if (current == 'yellow') {
        return 'green';
    }
    if (current == 'green') {
        return 'red';
    }
    if (current == 'red') {
        return 'blue';
    }
}

const positions = {
    // room: {color: {1:<pos>, 2: <pos>}}
};
const actives = {
    // room : {color: {1: true/false, 2: true/false}}
}
const toss_of = {};

const isActive = ({ room, color, num }) => {
    return actives[room][color][num];
}

const getPositionOf = ({ room }) => {
    return positions[room];
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
            if (status == 1) {
                socket.emit('room_joined');
                return;
            }
            if (status == 0) { socket.emit('room_error', { msg }); return }
        });
    });
    // join from room page
    socket.on('CHECK_AND_JOIN', ({ room_name, user_id, color }) => {
        check_user_in_room({ room_name, user_id }, ({ status, msg }) => {
            if (status == 0) { socket.emit('room_error', { msg }); return; }

            socket.join(room_name);
            socket.emit('checked_and_room_joined');


            positions[room_name] = {
                'blue': { 1: 0, 2: 0, 3: 0, 4: 0 },
                'red': { 1: 0, 2: 0, 3: 0, 4: 0 },
                'yellow': { 1: 0, 2: 0, 3: 0, 4: 0 },
                'green': { 1: 0, 2: 0, 3: 0, 4: 0 },
            };

            actives[room_name] = {
                'red': { 1: false, 2: false, 3: false, 4: false },
                'green': { 1: false, 2: false, 3: false, 4: false },
                'yellow': { 1: false, 2: false, 3: false, 4: false },
                'blue': { 1: false, 2: false, 3: false, 4: false },
            }

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
    socket.on('GET_CURRENT_TOSSER', ({ room }) => {
        let tosser = 'blue';
        if (toss_of[room]) {
            tosser = toss_of[room];
        }
        io.to(room).emit('receive_current_tosser', { color: tosser });
        console.log(room, tosser)
    });


    // dice toss
    socket.on('TOSS', ({ result, room, color }) => {
        const nextColor = getNextTosser({ current: color, result });
        toss_of[room] = nextColor;
        positions[room][color][1] = positions[room][color][1] + result;
        io.to(room)
            .emit('user_tossed', {
                color,
                result,
            });
        console.log(color, result)
    });



});



server.listen(5001, () => { console.log('listening on *:5000'); });
