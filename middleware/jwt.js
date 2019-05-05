const exjwt = require('express-jwt');

const config = require('../config');

// INstantiating the express-jwt middleware
module.exports = exjwt({
  secret: config.secret
});