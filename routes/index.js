const router = require('express').Router();


const users = require('./users');
const emptyUrl = require('./emptyUrl');


router.use('/', users);
router.use('*', emptyUrl);

module.exports = router;
