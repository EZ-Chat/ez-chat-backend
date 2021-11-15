'use strict';

const client = require('socket.io-client');

const user = client('http://localhost:3001/ezchat');

const clientUsername = "testUser" //fs stuff
const rooms = []; //fs stuff
const messageQueue = {}; //fs stuff

const payload = {
  rooms,
};

user.emit('join', payload);

const send = (messageData) => {
  const { message, room } = messageData;

  messageQueue[room].push(message)
  const payload = {
    username: clientUsername, //fs stuff
    message,
    room, // fs stuff
  };
  user.emit('send', payload);
};

user.on('syncRequest', (payload) => {
  const { room } = payload;

  for (const message of messageQueue[room]) {
    emit('send', {
      username,
      message,
      room
    })
  }
})

user.on('message', (payload) => {
  if (!payload.username === username) {
    const { message } = payload;
    // Logic
    console.log(message);
    user.emit('received', payload);
  }
});

user.on('received', (payload) => {
  const { message, username, room } = payload;
  if (username === clientUsername) {
    const messagePosition = messageQueue[room].indexOf(message);
    if (messagePosition > 0) messageQueue[room].slice(messagePosition, 1);
  }
})

