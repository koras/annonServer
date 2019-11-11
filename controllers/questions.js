const Questions = require('../models/questions');
const osLocale = require('os-locale');


/**
 * Добавление вопроса
 * 
 */
module.exports.createQuestion = (req, res) => {

  const owner = req.body._id;
  const { name, body } = req.body;
  return osLocale()
    .then(lang => { return { lang: lang }; })
    .then(dataParam => {

      dataParam['name'] = name;
      dataParam['body'] = body;
      dataParam['owner'] = owner;

      return Questions.create(dataParam)
        .then((question) => res.status(200)
          .send(question));
    });


  // Questions.create({ name, link, owner })
  //   .then((card) => res.status(201).send({ data: card }))
  //   .catch((err) => res.status(400).send({ message: err.message }));


};



module.exports.getQuestions = (req, res) => {
  Questions.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500)
      .send({ message: err.message }));
};

// 5dc80f65741599739ab884bb

// https://github.com/vovainfo/YP.sprint14/blob/develop/controllers/cards.js

// cnавим лайк
module.exports.likeQuestion = (req, res, next) => {
  const { id, owner } = req.body;
  Questions.findByIdAndUpdate(id, { $addToSet: { likes: owner } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => next(console.log(err.message)));
};

// удаляем лайк
module.exports.minuslikeQuestion = (req, res, next) => {
  const { id, owner } = req.body;
  Questions.findByIdAndUpdate(id, { $pull: { like: owner } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => next(console.log(err.message)));
};


// cnавим дизлайк
module.exports.dislikeQuestion = (req, res, next) => {
  const { id, owner } = req.body;
  Questions.findByIdAndUpdate(id, { $addToSet: { dislike: owner } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => next(console.log(err.message)));
};
// удаляем дизлайк
module.exports.minusdislikeQuestion = (req, res, next) => {
  const { id, owner } = req.body;
  Questions.findByIdAndUpdate(id, { $pull: { dislike: owner } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => next(console.log(err.message)));
};