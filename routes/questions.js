const router = require('express').Router();

//const auth = require('../middlewares/auth');

const {
  createQuestion,
  getQuestions,
  likeQuestion,
  minuslikeQuestion,
  dislikeQuestion,
  minusdislikeQuestion,
} = require('../controllers/questions');





router.post('/questions/create', createQuestion);
router.get('/questions', getQuestions);

router.post('/questions/like/minus', minuslikeQuestion);
router.post('/questions/like/add', likeQuestion);

router.post('/questions/dislike/minus', minusdislikeQuestion);
router.post('/questions/dislike/add', dislikeQuestion);


module.exports = router;



