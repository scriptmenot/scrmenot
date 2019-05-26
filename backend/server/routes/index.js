const express = require('express');
const router = express.Router();

require('../config/passport/passportConfiguration');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});


const loginRouter = require('./login');
const createCommentRouter = require('./comment');
const createDomainRouter = require('./domain');
const opinionRouter = require('./opinion');
const registrationRouter = require('./registration');

router.get('/', function(req, res) {
        res.status(200).send({message: 'Api placeholder'});
});

router.use('/login', loginRouter);
router.use('/comment', createCommentRouter(requireAuth));
router.use('/domain', createDomainRouter(requireAuth));
router.use('/opinion', opinionRouter);
router.use('/register', registrationRouter);

module.exports = router;
