const express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

// midleware
app.use(express.static('client'))

app.get('/hola-mundo', function(req, res) {
    res.status(200).send('Hola mundo desde una ruta');
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de socket.io y nodejs de Pau',
    nick: 'Bot - Pau'
}]

io.on('connection', function(socket) {
    console.log('El nodo con ip: ' + socket.handshake.address + ' se ha conectado');
    socket.emit('messages', messages);

    // guardar el mensaje para emitirlo a todos los usuarios
    socket.on('add-message', function(data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });


});

server.listen(6677, function() {
    console.log('Servidor está funcionando en http://localhost:6677');
});