'use strict';

const client = require('socket.io-client');
const faker = require('faker');

const vendorClient = client('http://localhost:3001/caps');

// client('http://localhost:3030');

const pickup = (store) => {
  const payload = {
    store,
    orderId: faker.random.alphaNumeric(15),
    customer: faker.name.findName(),
    address: faker.address.streetAddress(),
  };
  vendorClient.emit('pickup', payload);
};

pickup('1-800-sendit');

vendorClient.on('delivered', (payload) => console.log('Thanks you for delivering', payload.orderId));
