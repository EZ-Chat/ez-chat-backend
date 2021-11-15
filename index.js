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
      ezchat.to(room).emit('syncRequest',{room});
    }
  });

  socket.on('send', (payload) => {
    ezchat.to(payload.room).emit('message', payload);
  });

  socket.on('received', (payload) => {
    ezchat.to(payload.room).emit('received', payload);
  })

});
