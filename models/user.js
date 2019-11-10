const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  key: {
    type: String,
    // minlength: 2,
    // maxlength: 30,
    required: true,
  },
  lang: {
    type: String,
    minlength: 2,
    maxlength: 5,
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


userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль 1'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль 2'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

// валидировать ссылки https://mongoosejs.com/docs/validation.html.
