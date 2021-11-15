'use strict';

const PLATFORM = process.platform;
console.log("Platform: ",PLATFORM);

const os = require('os');
const macadress = os.networkInterfaces()
console.log(macadress)