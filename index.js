'use strict';

const socketio = require('socket.io');

const server = socketio(PORT);

const ezchat = server.of('/ezchat');

ezchat.on('connection', (socket) => {
  console.log('Connected to socket', socket.id);
  // socket.join(roomKey);

  socket.on('join', (payload) => {
    for (const room of payload.rooms) {
      socket.join(room);
    }
  });

  socket.on('send', (payload) => {
    ezchat.to(payload.room).emit('message', payload);
  });

  // socket.on('in-transit', (payload) => {
  //   socket.join(orderId);
  //   ezchat.to(orderId).emit('delivered', payload);
  // });
});
