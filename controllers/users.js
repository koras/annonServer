const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Questions = require('../models/questions');
const ipAddress = require("ip");


//const LanguageDetect = require('languagedetect');
const osLocale = require('os-locale');



module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ comment: 'Нет пользователя с таким id' });
      }
    })
    .catch((err) => res.status(404).send({ message: err.message, comment: 'Нет пользователя с таким id' }));
};
// However, mongoose translates findById (undefined) into findOne ({_id: null}).

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    // eslint-disable-next-line no-unused-vars
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        '1',
        // 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        httpOnly: true,
        // ,sameSite: true
      });

      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};



/**
 * Здесь надо определить язык браучера и сгенерировать пользователя
 * 
 */
module.exports.createUser = (req, res) => {
  let ip = ipAddress.address();

  User.findById(req.body._id)
    .then((user) => {

      if (!user) {
        //  osLocale().then((user) => console.log(user));
        //    res.status(404).send({ message: 'Такого пользователя не существует' });

        return osLocale()
          .then(lang => { return { ip: ip, lang: lang }; })
          .then(dataParam => {

            console.log(dataParam);
            return User.create(dataParam).then((user) => res.status(200).send(user));
          });
      }
      res.send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: `create error :  ${err}` }));
};


module.exports.patchAcc = (req, res) => {
  const { name, about } = req.body;

  User.findById(req.user._id)
    .then((user) => {
      if (user._id == req.user._id) {
        User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
          .then((user) => res.send({ data: user }))
          .catch((err) => res.status(500).send({ message: err.message }));
      } else {
        res.status(401).send({ message: 'No permissions' });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
