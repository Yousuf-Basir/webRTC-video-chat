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
    console.log('A user connected');

    // handle signalling message
    socket.on('message', message => {
        console.log('Received message: ', message);

        // Broadcast the message to all connected clients except the sender
        socket.broadcast.emit('message', message);
    });

    // handle disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.get("/", (req, res) => {
    res.send("Server running");
});

const PORT = process.send.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})