const router = require('express').Router();

const cards = require('./cards');
const users = require('./users');
const emptyUrl = require('./emptyUrl');

router.use('/', cards);
router.use('/', users);
router.use('*', emptyUrl);

module.exports = router;
