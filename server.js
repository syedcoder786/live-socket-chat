const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express()
const server = http.createServer(app);
const io = socketio(server, {
    cors:{
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});
//bodyParser middleware
app.use(express.json());
app.use(cors());

io.on("connection",(socket) => {
    console.log("Socket connected")

    socket.on("chat", (payload) => {
        console.log("Payload:",payload)
        io.emit("chat", payload)
    })
})

server.listen(5000, () => {
    console.log("Server listening on port 5000...")
})
