const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    //   // minlength: 2,
    //   // maxlength: 30,
    //   required: true,
  },
  lang: {
    type: String,
    minlength: 2,
    maxlength: 10,
    required: true,
  },
  ip: {
    type: String,
    minlength: 9,
    maxlength: 20,
    required: true,
  },
  question: {
    type: Object,
  },
});

module.exports = mongoose.model('users', userSchema);

// валидировать ссылки https://mongoosejs.com/docs/validation.html.
