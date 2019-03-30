// setup our process.env variables for use
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config')

mongoose.connect(config.mongodb, {
  useNewUrlParser: true
})

let db = mongoose.connection;

db.once('open', (callback) => { console.log("# Mongo DB: Connected to server"); })

const server = express()

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));

// See the react auth blog in which cors is required for access
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

server.use('/', require('./routes'))

server.listen(config.port, () => {
  console.log(`Listening on port: ${config.port}`)
})