const router = require('express').Router();

//const auth = require('../middlewares/auth');

const {
  createQuestion,
  getQuestions
} = require('../controllers/questions');


router.post('/questions/create', createQuestion);
router.get('/questions', getQuestions);

module.exports = router;
