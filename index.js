'use strict';

const socketio = require('socket.io');

const server = socketio(PORT);

const ezchat = server.of('/ezchat');

ezchat.on('connection', (socket) => {
  console.log('Connected to socket', socket.id);

  socket.on('send', (payload) => {
    orderId = payload.orderId;
    socket.join(orderId);
    ezchat.emit('join', payload);
  });

  socket.on('in-transit', (payload) => {
    socket.join(orderId);
    ezchat.to(orderId).emit('delivered', payload);
  });
});
