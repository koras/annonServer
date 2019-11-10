const mongoose = require('mongoose');
const validator = require('validator');

const answers = new mongoose.Schema({

  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
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
    type: Boolean,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('likes', cardSchema);
