const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const config = require('../config');

const Users = require('../models/user');

router.post('/login', ({ body: { email, password } }, res) => {

  Users.find({
    email: email.toLowerCase()
  })
  .limit(1)
  .lean()
  .exec((err, users) => {
    if (err) return res.status(500).send({ err, message: 'Error occured trying to log you in' });
    if (users.length === 0) return res.status(404).send({ err: 404,  message: 'No user with that email.' });
    let user = users[0]

    bcrypt.compare(password, user.password).then(same => {
      // make sure our passwords match
      if (same) {
        
        const payload = {
          _id: user._id
        }

        const token = jwt.sign(payload, process.env.secret, {
          expiresIn: '2d'
        });

        return res.status(200).send({ token })
      }

      // if they dont just return a 403 status
      res.status(403).send('password dont match')
    })

  })
});


// add our signup code first
router.post('/signup', ({ body: { email, password } }, res) => {
  const user = new Users({
    email: email.toLowerCase(),
    password
  });

  user.save((err, newUser) => {
    if (err) return res.status(500).send({ err, message: 'Error accured trying to save user' });

    const payload = {
      _id: newUser._id
    }
  
    const token = jwt.sign(payload, config.secret, {
      expiresIn: '2d'
    });

    res.status(200).send({ token })
  })
});

module.exports = router;