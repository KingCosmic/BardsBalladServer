const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const bcrypt = require('bcrypt')

const config = require('../config')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
})

// encrypt password before save
userSchema.pre('save', function(next) {
  const user = this;

  // don't rehash if it's an old user
  if (!user.isModified || !user.isNew) return next();


  bcrypt.hash(user.password, config.saltingRounds, function(err, hash) {
    if (err) {
      console.log('Error hashing password for user', user.email);
      next(err);
    } else {
      user.password = hash;
      next();
    }
  });
});

module.exports = mongoose.model('users', userSchema);