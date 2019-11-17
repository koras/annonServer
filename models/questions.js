const mongoose = require('mongoose');
//const validator = require('validator');

const questionsSchema = new mongoose.Schema({

  name: {
    type: String,
    minlength: 2,
    maxlength: 100,
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
    minlength: 100,
    maxlength: 2000,
    // validate: {
    //   validator(v) {
    //     return validator.isURL(v);
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

module.exports = mongoose.model('questions', questionsSchema);
