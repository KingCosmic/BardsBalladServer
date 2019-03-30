const exjwt = require('express-jwt');


// INstantiating the express-jwt middleware
module.exports = exjwt({
  secret: process.env.secret
});