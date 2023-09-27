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

// create a room data structure to keep track of users in each room
const rooms = {};

// socket io event handler for when a client connects
io.on('connection', socket => {
    const room = socket.handshake.query.room || 'default';

    // create room if not exists
    if (!rooms[room]) {
        rooms[room] = [];
    }

    // add the user to the room
    rooms[room].push(socket);

    console.log(`A user connected to room ${room}`);

    // handle signalling message
    socket.on('message', message => {
        // broadcast the message to all users in the same room
        rooms[room].forEach((userSocket) => {
            if(userSocket !== socket) {
                userSocket.emit('message', message);
            }
        });
    });

    // handle disconnect
    socket.on('disconnect', () => {
        // remove the user from the room
        const index = rooms[room].indexOf(socket);
        if(index !== -1) {
            rooms[room].splice(index, 1);
        }

        console.log(`A user disconnected from the room ${room}`)
    });
});

app.get("/", (req, res) => {
    res.send("Server running");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})