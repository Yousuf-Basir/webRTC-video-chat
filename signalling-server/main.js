const express = require('express');
const http = require('http');
var cors = require('cors')
const socketIo = require('socket.io');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./user');
const generateAgoraToken = require('./utils/generateAgoraToken');

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
    socket.on('join', ({ name }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room: roomName });
        if (error) {
            console.log("ERROR:", error);
            return callback(error);
        };

        socket.join(roomName);
        console.log(`${user.name} joined the room ${roomName}`);
        
        io.to(roomName).emit('roomData', {
            room: roomName,
            users: getUsersInRoom(roomName)
        });

        callback();
    });  

    socket.on("getMembers", message => {
        console.log("got request for getting members", getUsersInRoom(roomName))
        socket.emit('roomData', {
            room: roomName,
            users: getUsersInRoom(roomName)
        });
    })

    // handle signalling message
    socket.on('message', message => {
        socket.broadcast.to(roomName).emit('message', message);
    });

    // handle leave
    socket.on('leave', () => {
        socket.leave(roomName);
        // send a message to the client to remove the remote stream
        socket.broadcast.to(roomName).emit('leave');
        const user = removeUser(socket.id);
        console.log(`${user.name} left the room ${roomName}`);
        io.to(roomName).emit('roomData', {
            room: roomName,
            users: getUsersInRoom(roomName)
        });
    });

    // handle disconnect
    socket.on('disconnect', () => {
        socket.leave(roomName);
        const user = removeUser(socket.id);
        console.log(`${user?.name || "Guest"} disconnected from the room ${roomName}`);

        io.to(roomName).emit('roomData', {
            room: roomName,
            users: getUsersInRoom(roomName)
        });
    });
});

app.get("/", (req, res) => {
    res.send("Server running");
});

app.get("/generate-agora-token", (req, res) => {
    // get channel_name and uui from url query params
    const channelName = req.query.channel_name;
    const uid = req.query.uid;

    if(channelName && uid) {
        // generate agora token
        const token = generateAgoraToken(channelName, uid);
        res.send(token);
    }
    else {
        res.status(400).send("Bad Request. Missing channel_name or uid");
    }
});

const PORT = process.env.PORT || 3009;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})