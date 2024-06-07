const Cerver = require('./src/server');
require('dotenv').config();

const server = new Cerver();

server.execute();
