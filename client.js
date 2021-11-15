'use strict';

require('dotenv');
const fs = require('fs');
const client = require('socket.io-client');
const user = client('http://localhost:3001/ezchat');
const authUser = require('./components/authenticateUser.js');

//authentication stuff
let clientUsername = process.env.username;
let clientPassword = process.env.password;

//fs stuff
let rooms = []; //fs stuff
let messageQueue = {}; //fs stuff
let messageHistory = [];

let userData = {
  username: '',
  rooms: [],
  messageQueue: {},
  messageHistory: [],
};
// const localFolder = '/localStore';

// on authentication
try {
  // if (!fs.existsSync(localFolder)) fs.mkdirSync(localFolder);
  const userJson = fs.readFileSync(`userData-${clientUsername}.json`);
  parsedUserData = JSON.parse(userJson);
  for (const key in userData) {
    if (key in parsedUserData) {
      userData[key] = parsedUserData[key];
    }
    console.log(userData)
  }
} catch (err) {
  console.error(err);
}

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
    const { message, messageTime } = payload;
    messageHistory.push({
      message,
      username,
      dateTime: messageTime
    });
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

fs.writeFileSync(`userData-${clientUsername}.json`, JSON.stringify(userData));
