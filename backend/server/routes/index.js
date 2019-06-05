const express = require('express');
const router = express.Router();

require('../config/passport/passportConfiguration');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireUserToBeAuthor = require('../controllers/authorization/authorization');

const createCommentRouter = require('./comment');
const createDomainRouter = require('./domain');
const createOpinionRouter = require('./opinion');

const loginRouter = require('./login');
const registrationRouter = require('./registration');
const userRouter = require('./user');

router.get('/', function(req, res) {
        res.status(200).send({message: 'Api placeholder'});
});

router.use('/login', loginRouter);
router.use('/comment', createCommentRouter(requireAuth, requireUserToBeAuthor));
router.use('/domain', createDomainRouter(requireAuth, requireUserToBeAuthor));
router.use('/opinion', createOpinionRouter(requireAuth, requireUserToBeAuthor));
router.use('/register', registrationRouter);
router.use('/user', userRouter);

module.exports = router;
