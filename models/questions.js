const mongoose = require('mongoose');
//const validator = require('validator');

const questionsSchema = new mongoose.Schema({

  name: {
    type: String,
    minlength: 5,
    maxlength: 150,
    required: true,
  },
  lang: {
    type: String,
    minlength: 2,
    maxlength: 6,
    required: true,
  },
  body: {
    type: String,
    minlength: 5,
    maxlength: 1500,
    // validate: {
    //   validator(v) {
    //     return validator.isURL(v);
    //  },
    //  message: (props) => `${props.value} Check link pls !`,
    //  },
    required: true,
  },
  delete: {
    type: Boolean,
    default: false,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },

  answers: {
    type: Number,
    default: 0,
  },


  answersUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    default: [],
  }],


  likes: {
    type: Number,
    default: 0,
  },

  dislike: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('questions', questionsSchema);
