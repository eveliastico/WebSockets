const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/cliente/index.html');
});

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('set username', (username) => {
        socket.username = username;
        console.log(`Usuario conectado: ${username}`);
        io.emit('user connected', `${username} se ha unido al chat`);
    });

    socket.on('chat message', (msg) => {
        console.log(`Mensaje de ${socket.username}: ${msg}`);
        io.emit('chat message', { username: socket.username, message: msg });
    });

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.username || 'Anónimo'}`);
        io.emit('user disconnected', `${socket.username || 'Un usuario'} se ha desconectado`);
    });
});

server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

