const express = require('express');
const http = require('http');
var cors = require('cors')
const socketIo = require('socket.io');

// create express app
const app = express();
app.use(cors());
const server = http.createServer(app);

// create sokcet io server by passing the http server
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// socket io event handler for when a client connects
io.on('connection', socket => {
    const roomName = socket.handshake.query.room || 'default';

    // join socket room
    socket.join(roomName);
    console.log(`${socket.id} has joined ${roomName}`);

    // handle signalling message
    socket.on('message', message => {
        socket.broadcast.to(roomName).emit('message', message);
    });

    // handle leave
    socket.on('leave', () => {
        socket.leave(roomName);
        // send a message to the client to remove the remote stream
        socket.broadcast.to(roomName).emit('leave');
        console.log(`${socket.id} left the room ${roomName}`);
    });

    // handle disconnect
    socket.on('disconnect', () => {
        socket.leave(roomName);
        console.log(`${socket.id} disconnected from the room ${roomName}`);
    });
});

app.get("/", (req, res) => {
    res.send("Server running");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})