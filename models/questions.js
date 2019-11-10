const mongoose = require('mongoose');
//const validator = require('validator');

const questionsSchema = new mongoose.Schema({

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

  like: {
    type: Object,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('questions', questionsSchema);
