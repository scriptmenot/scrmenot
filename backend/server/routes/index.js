const express = require('express');
const router = express.Router();
require('../config/passport/passportConfiguration');

const loginRouter = require('./login');
const commentRouter = require('./comment');
const domainRouter = require('./domain');
const opinionRouter = require('./opinion');
const registrationRouter = require('./registration');

router.get('/', function(req, res) {
        res.status(200).send({message: 'Api placeholder'});
});

router.use('/login', loginRouter);
router.use('/comment', commentRouter);
router.use('/domain', domainRouter);
router.use('/opinion', opinionRouter);
router.use('/register', registrationRouter);

module.exports = router;
