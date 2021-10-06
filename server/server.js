const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});



io.on('connection', (socket) => {
    console.log('a user connected');


    socket.on('disconnect', () => console.log('user left'));
});



server.listen(5000, () => { console.log('listening on *:5000'); });