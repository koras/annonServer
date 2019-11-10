const router = require('express').Router();

//const auth = require('../middlewares/auth');

const {
  createAnswer,
  getAnswersQuestions,
  getAnswers
} = require('../controllers/answers');


router.post('/answers/create', createAnswer);

router.get('/answers/question/:question', getAnswersQuestions);

router.get('/answers', getAnswers);

module.exports = router;
