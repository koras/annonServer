const router = require('express').Router();

const auth = require('../middlewares/auth');

const {
  createUser,
  login,
  getUser,
  getUsers,
  patchAcc,
} = require('../controllers/users');

router.post('/users/signup', createUser);
router.post('/signin', login);

router.get('/users', auth, getUsers);
router.get('/users/:id', auth, getUser);
router.patch('/users/me', auth, patchAcc);

module.exports = router;
