'use strict';

const client = require('socket.io-client');

const user = client('http://localhost:3001/ezchat');

const rooms = []; //fs stuff

const payload = {
  rooms,
};

user.emit('join', payload);

const send = (messageData) => {
  const payload = {
    username, //fs stuff
    message: messageData.message,
    room: messageData.room, // fs stuff
  };
  user.emit('send', payload);
};

user.on('message', (payload) => {
  if (!payload.username === username) {
    // Logic
  }
});
