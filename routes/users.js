const router = require('express').Router();

const auth = require('../middlewares/auth');

const {
  createUser,
  login,
  getUser,
  getUsers,
  patchAcc,
  patchAccAva,
} = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);

router.get('/users', auth, getUsers);
router.get('/users/:id', auth, getUser);
router.patch('/users/me', auth, patchAcc);
router.patch('/users/me/avatar', auth, patchAccAva);

module.exports = router;
