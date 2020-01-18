const Answers = require('../models/answers');
const Questions = require('../models/questions');
const osLocale = require('os-locale');
var ObjectId = require('mongodb').ObjectID;

const range = 20;

/**
 * Добавление вопроса
 *
 *
 */
module.exports.createAnswer = (req, res) => {

  console.log('createAnswer');

  const { text, question, owner } = req.body;
  const dataParams = { text, question, owner };
  const findUniq = { owner, question };

  const findQuestions = { _id: ObjectId(question) };

  Questions.find(findQuestions);



  Questions.update(findQuestions, { answers: 15555 });
  Questions.update(findQuestions, { $set: { answers: 6666 } });

  Questions.update(findQuestions, { $push: { answersUsers: owner } });
  Questions.updateOne(findQuestions, { $inc: { answers: 1221 } });


  Answers.find(findUniq)
    .then((result) => {
      if (!result['0']) {
        console.log('reate 1');
        return osLocale()
          .then((lang) => lang)
          .then((lang) => {
            dataParams['lang'] = lang;
            console.log('send answer');
            return Answers.create(dataParams)
              .then(
                (qResult) => {
                  console.log('update', question);
                  Questions.updateOne(findQuestions, { $inc: { answers: 1 }, $push: { answersUsers: owner } }, function (err, res) {
                    if (err) throw console.log("err", err);
                    console.log("1 document updated");
                    console.log(res);

                  });
                  res.status(200).send(qResult);

                }
              );
          }).catch((err) => console.log(err));
      }

      return res.status(200).send({ published: false });
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

/**
 * Получаем все ответы определённого пользователя
 *
 *
 */
module.exports.getAnswersMy = (req, res) => {
  console.log(req.params);
  const { owner, limit } = req.body;

  Answers.find({ owner })
    .populate('question')
    .skip(limit)
    // .sort({ 'date': -1 })
    .limit(range)
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
