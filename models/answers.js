const mongoose = require('mongoose');
//const validator = require('validator');

const answersSchema = new mongoose.Schema({
  lang: {
    type: String,
    minlength: 2,
    maxlength: 10,
    required: true,
  },
  text: {
    type: String,
    minlength: 5,
    maxlength: 500,
    //  validate: {
    //    validator(v) {
    //   return validator.isURL(v);
    //  },
    //  message: (props) => `${props.value} Check link pls !`,
    //  },
    required: true,
  },

  delete: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: true,
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

module.exports = mongoose.model('answers', answersSchema);
