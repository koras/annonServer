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



  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],

  dislike: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('answers', answersSchema);
