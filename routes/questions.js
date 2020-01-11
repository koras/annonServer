const router = require('express').Router();


const {
  createQuestion,
  getQuestions,
  getQuestionsSearch,
  getQuestion,
  likeQuestion,
  minuslikeQuestion,
  dislikeQuestion,
  minusdislikeQuestion,
} = require('../controllers/questions');


router.post('/questions/create', createQuestion);
router.post('/questions/search', getQuestionsSearch);
router.post('/questions', getQuestions);
router.get('/question/:question', getQuestion);


router.post('/questions/like/minus', minuslikeQuestion);
router.post('/questions/like/add', likeQuestion);

router.post('/questions/dislike/minus', minusdislikeQuestion);
router.post('/questions/dislike/add', dislikeQuestion);


module.exports = router;
