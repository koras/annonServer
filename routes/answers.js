const router = require('express').Router();


const {
  createAnswer,
  getAnswersQuestions,
  getAnswers,

  dislikeAnswers,
  minusdislikeAnswers,
  minuslikeAnswers,
  likeAnswers
} = require('../controllers/answers');


router.post('/answers/create', createAnswer);

router.get('/answers/question/:question', getAnswersQuestions);

router.get('/answers', getAnswers);



router.post('/answers/like/minus', minuslikeAnswers);
router.post('/answers/like/add', likeAnswers);

router.post('/answers/dislike/minus', minusdislikeAnswers);
router.post('/answers/dislike/add', dislikeAnswers);



module.exports = router;
