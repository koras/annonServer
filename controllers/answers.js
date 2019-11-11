const Answers = require('../models/answers');
const osLocale = require('os-locale');


/**
 * Добавление вопроса
 * 
 */
module.exports.createAnswer = (req, res) => {

  console.log('createAnswer');

  const owner = req.body._id;
  const { text, question } = req.body;
  const dataParams = { text, question, owner };

  const findUniq = { owner, question };

  Answers.find(findUniq)
    .then((result) => {
      if (!result['0']) {
        console.log('reate 1');
        return osLocale()
          .then((lang) => lang)
          .then((lang) => {
            dataParams['lang'] = lang;
            console.log('no create  3 ', dataParams);
            return Answers.create(dataParams).then((qResult) => res.status(200).send(qResult));
          }).catch((err) => console.log(err));
      } else {

        return res.status(200).send({});
      }
    }).catch((err) => console.log(err));

};


/**
 * Находим ответы к текущему вопросу
 * 
 */
module.exports.getAnswersQuestions = (req, res) => {

  const { question } = req.params;
  Answers.find({ question })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ comment: 'Нет ответов на текущий вопрос' });
      }
    })
    .catch((err) => res.status(404).send({ message: err.message, comment: 'Нет пользователя с таким id' }));
};





module.exports.getAnswers = (req, res) => {
  Answers.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500)
      .send({ message: err.message }));
};



// cnавим лайк
module.exports.likeAnswers = (req, res, next) => {
  const { id, owner } = req.body;
  Answers.findByIdAndUpdate(id, { $addToSet: { likes: owner } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => next(console.log(err.message)));
};

// удаляем лайк
module.exports.minuslikeAnswers = (req, res, next) => {
  const { id, owner } = req.body;
  Answers.findByIdAndUpdate(id, { $pull: { like: owner } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => next(console.log(err.message)));
};


// cnавим дизлайк
module.exports.dislikeAnswers = (req, res, next) => {
  const { id, owner } = req.body;
  Answers.findByIdAndUpdate(id, { $addToSet: { dislike: owner } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => next(console.log(err.message)));
};
// удаляем дизлайк
module.exports.minusdislikeAnswers = (req, res, next) => {
  const { id, owner } = req.body;
  Answers.findByIdAndUpdate(id, { $pull: { dislike: owner } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => next(console.log(err.message)));
};


// 5dc80f65741599739ab884bb
// 5dc7dae8ad3f7a2e2dd5b212
