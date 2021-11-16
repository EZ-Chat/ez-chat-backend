'use strict';

// const PLATFORM = process.platform;
// console.log("Platform: ", PLATFORM);

const fs = require('fs').promises;
const client = require('socket.io-client');

// on authentication
const getUserData = async (user) => {
  const { username, password } = user;
  let userData = {
    username,
    messageQueue: {},
    messageHistory: [],
  };


  try {
    const userJson = await fs.readFile(`userData-${username}.json`);
    let parsedUserData = JSON.parse(userJson);
    for (const key in userData) {
      if (key in parsedUserData) {
        userData[key] = parsedUserData[key];
      }
    }
    console.log("User Data", userData)
    return userData;
  } catch (err) {
    console.error(err);
  }
}

const saveUserData = async ( payload ) => {
  const { username, password, parsedUserData } = payload;
  try {
    await fs.writeFile(`userData-${username}.json`, JSON.stringify(parsedUserData));
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getUserData,
  saveUserData
}
