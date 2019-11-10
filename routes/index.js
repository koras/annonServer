const router = require('express').Router();

//const cards = require('./cards');
const users = require('./users');
const questions = require('./questions');
const emptyUrl = require('./emptyUrl');



router.use('/', users);
router.use('/', questions);
router.use('*', emptyUrl);

module.exports = router;
