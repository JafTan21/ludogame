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
    room_exists
} = require('./room/roomHelper');



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


        if (!room_exists({ room }) && !asCreator) {
            socket.emit('room_not_found', {
                socketId: socket.id,
                socketIdFor: user
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
    })


});



server.listen(5000, () => { console.log('listening on *:5000'); });
