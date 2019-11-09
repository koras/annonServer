const mongoose = require('mongoose');
const validator = require('validator');

const answers = new mongoose.Schema({

  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  lang: {
    type: String,
    minlength: 2,
    maxlength: 5,
    required: true,
  },
  body: {
    type: String,
    minlength: 30,
    maxlength: 500,
    //  validate: {
    //    validator(v) {
    //   return validator.isURL(v);
    //  },
    //  message: (props) => `${props.value} Check link pls !`,
    //  },
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'questions',
    required: true,
  },

  like: {
    type: Object,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('answers', cardSchema);
