const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'plaese enter your name!'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'please enter your email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide valid email'],
  },
  photo: [String],
  password: {
    type: String,
    required: [true, 'please enter password!'],
    minlenth: [8, 'please enter 8 or more words'],
    // maxlenth: [12, 'please enter 8 or less words'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please enter confirm password!'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
