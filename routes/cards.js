const router = require('express').Router();

const auth = require('../middlewares/auth');

// const {
//   getCards,
//   createCard,
//   removeCard,
//   createLike,
//   removeLike,
// } = require('../controllers/cards');

// router.get('/cards', auth, getCards);
// router.post('/cards', auth, createCard);
// router.delete('/cards/:id', auth, removeCard);
// router.put('/cards/:id/likes', auth, createLike);
// router.delete('/cards/:id/likes', auth, removeLike);

module.exports = router;
