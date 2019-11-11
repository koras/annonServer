const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Questions = require('../models/questions');
const ipAddress = require("ip");





/**
 * Здесь надо определить язык браучера и сгенерировать пользователя
 * 
 */
module.exports.createUser = (req, res) => {
  let ip = ipAddress.address();

  User.findById(req.body._id)
    .then((user) => {

      if (!user) {
        return osLocale()
          .then(lang => {
            return { "ip": ip, "lang": lang };
          })
          .then(dataParam => {

            console.log(dataParam);
            return User.create(dataParam).then((user) => res.status(200).send(user));
          });
      }
      res.send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: `create error :  ${err}` }));
};

