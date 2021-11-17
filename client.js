'use strict';

require('dotenv').config();
const fs = require('fs');
const client = require('socket.io-client');
const user = client('http://localhost:3001/ezchat');
const authUser = require('./components/authenticateUser.js');
const { getUserData, saveUserData } = require('./components/dataStore');

//authentication stuff
const clientUsername = process.env.USERNAME;
const clientPassword = process.env.PASSWORD;



// on authentication
// ....stuff happens

let rooms = []; // <- replace with returned user data from auth

let userData = getUserData({
  username: clientUsername,
  password: clientPassword,
});
console.log("userData: ", userData, "<-----------------")

//fs stuff
let { messageQueue, messageHistory } = userData;

// const payload = {
//   rooms,
// };

// user.emit('join', payload);

// const send = (messageData) => {
//   const { message, room } = messageData;

//   messageQueue[room].push(message)
//   const payload = {
//     username: clientUsername, //fs stuff
//     message,
//     room, // fs stuff
//   };
//   user.emit('send', payload);
// };

// user.on('syncRequest', (payload) => {
//   const { room } = payload;

//   for (const message of messageQueue[room]) {
//     emit('send', {
//       username,
//       message,
//       room
//     })
//   }
// })

// user.on('message', (payload) => {
//   if (!payload.username === username) {
//     const { message, messageTime } = payload;
//     messageHistory.push({
//       message,
//       username,
//       dateTime: messageTime
//     });
//     console.log(message);
//     user.emit('received', payload);
//   }
// });

// user.on('received', (payload) => {
//   const { message, username, room } = payload;
//   if (username === clientUsername) {
//     const messagePosition = messageQueue[room].indexOf(message);
//     if (messagePosition > 0) messageQueue[room].slice(messagePosition, 1);
//   }
// })

let userDataToSave = {
  username: clientUsername,
  password: clientPassword,
  parsedUserData: {
    messageQueue,
    messageHistory
  }
}
console.log('bybybybybybybyby')
saveUserData(userDataToSave);
