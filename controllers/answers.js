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
            // Object.assign(dataParam, dataParam, dataParams);
            //   console.log('no create  4 ', dataParam);

            return Answers.create(dataParams).then((qResult) => res.status(200).send(qResult));

          }).catch((err) => console.log(err));
      } else {

        console.log('no create');
        return res.status(200).send({});
      }
    }).catch((err) => console.log(err));

  // return osLocale()
  //   .then(lang => { return { lang: lang }; })
  //   .then(dataParam => {

  //     dataParam['text'] = text;
  //     dataParam['question'] = question;
  //     dataParam['owner'] = owner;

  //     // console.log('dataParam 2 ', dataParam);

  //     return Answers.create(dataParam)
  //       .then((question) => res.status(200)
  //         .send(question)).catch(err => err);
  //   });



};


module.exports.getAnswersQuestions = (req, res) => {

  const { question } = req.id;


  Answers.find({ question })
    .then((answers) => res.send({ data: answers }))
    .catch((err) => res.status(500)
      .send({ message: err.message }));
};


module.exports.getAnswers = (req, res) => {
  Answers.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500)
      .send({ message: err.message }));
};

// 5dc80f65741599739ab884bb
// 5dc7dae8ad3f7a2e2dd5b212
