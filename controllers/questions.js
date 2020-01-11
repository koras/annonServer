const Questions = require('../models/questions');
const Answers = require('../models/answers');
const osLocale = require('os-locale');
var ObjectId = require('mongodb').ObjectID;


/**
 * Добавление вопроса
 *
 */

const total = 10;

module.exports.createQuestion = (req, res) => {

  const owner = req.body.owner;
  const { name, body } = req.body;
  return osLocale()
    .then(lang => { return { lang: lang } })
    .then(dataParam => {
      dataParam['name'] = name;
      dataParam['body'] = body;
      dataParam['owner'] = owner;
      return Questions.create(dataParam)
        .then((question) => res.status(200)
          .send(question))
        .catch((err) => res.status(500).send({ message: `create error :  ${err}` }));
    });
};

module.exports.getQuestions = (req, res) => {
  let result = {};
  const { limit, type, owner } = req.body;
  console.log('section', limit, type, owner);

  switch (type) {
    case "owner":
      Questions.find({ owner })
        .skip(limit)
        // .sort({ 'date': -1 })
        .limit(total)
        .then((cards) => res.send({ data: cards }))
        .catch((err) => res.status(500)
          .send({ message: err.message }));
      break;
    //https://stackoverflow.com/questions/11303294/querying-after-populate-in-mongoose
    case 'requiredAnswers':
      //https://habr.com/ru/post/134590/
      console.log('requiredAnswers');
      // получение вопросов на которые нет ответов текущего пользователя
      Questions.find({ answersUsers: { '$nin': [ObjectId(owner)] }, owner: { '$nin': [ObjectId(owner)] } })
        .skip(0)
        // .sort({ 'date': -1 })
        .limit(250)
        .sort({ "answers": 1 })
        .then(
          (cards) => {
            console.log('получение вопросов на которые нет ответов текущего пользователя');
            return res.send({ data: cards })
          }
        )
        .catch((err) => res.status(500)
          .send({ message: err.message }));

      break;
    default:
      result = Questions.find({})
        .skip(limit)
        // .sort({ 'date': -1 })
        .limit(total)
        .then((cards) => res.send({ data: cards }))
        .catch((err) => res.status(500)
          .send({ message: err.message }));
      break;
  }
  return result;
};

module.exports.getQuestionsSearch = (req, res) => {
  //  db.questions.aggregate([{ $match:  { $text: { $search: "свое" } }}] );
  const total = 10;
  // const limit = 0;
  const { text } = req.body;
  let limit = req.body.limit;

  //const search = { $or: [{ body: "/" + text + "/i" }, { name: /text/i }] };
  //db.questions.find( { $or: [{ "body" : { $regex:  "вопрос",  $options:"i"} }, { "name" : { $regex:  "вопрос",  $options:"i"} }] });

  const search = { $or: [{ "body": { $regex: text, $options: "i" } }, { "name": { $regex: text, $options: "i" } }] };

  console.log('text', text);
  console.log(text);
  console.log(search);

  return Questions.find(search)
    //  .find({ $text: { $search: text } })
    ///db.questions.find({ $text: { $search: "свое" } });
    //  .find({ name: { $regex: text, $options: "i" } })
    //  .find({ ‘$**’: `/.*${text}.*/`, $options: "i" })
    //  .skip(0)
    // .sort({ 'date': -1 })
    //  .limit(total)
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500)
      .send({ message: err.message }));
}

module.exports.getQuestion = (req, res) => {
  const { question } = req.params;

  Questions.findById(question)
    .then((topic) => {
      if (topic) {
        res.send({ data: topic });
      } else {
        res.status(404).send({ comment: 'Вопрос не найден' });
      }
    })
    .catch((err) => res.status(500).send({ message: `create error :  ${err}` }));
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