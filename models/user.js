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

  keyMath: {
    type: Number,
    minlength: 5,
    maxlength: 7,
    default: 0,
  },
  registartionStep: {
    type: Number,
    minlength: 5,
    maxlength: 7,
    default: 0,
  },

  reputation: {
    type: Number,
    minlength: 5,
    maxlength: 7,
    default: 10,
  },


  likesQuestions: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  disLikeQuestions: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  likesAnswers: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],

  disLikeAnswers: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],

  question: {
    type: Object,
  },
});

module.exports = mongoose.model('users', userSchema);
