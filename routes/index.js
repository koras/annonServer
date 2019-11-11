const router = require('express').Router();

const users = require('./users');
const questions = require('./questions');
const answers = require('./answers');
const emptyUrl = require('./emptyUrl');



router.use('/', users);
router.use('/', answers);
router.use('/', questions);
router.use('*', emptyUrl);

module.exports = router;
