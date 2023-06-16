const express = require('express');
const { dirname } = require('path');
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3500


http.listen(PORT, () => {
    console.log(`server is listen on ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    const path = res.sendFile(__dirname + '/index.html')
    console.log(path)
})

const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log("Connected...");
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
})