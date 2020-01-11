const router = require('express').Router();

const auth = require('../middlewares/auth');

const {
  createUser,
  //  login,
  // getUser,
  // getUsers,
  // patchAcc,
} = require('../controllers/users');

router.post('/users/create', createUser);

module.exports = router;
