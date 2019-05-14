const express = require('express');
const router = express.Router();

const authenticationRouter = require('./authentication');
const commentRouter = require('./comment');
const domainRouter = require('./domain');
const opinionRouter = require('./opinion');
const registrationRouter = require('./registration');

const APIRoutes = passport => {
    router.get('/', function (req, res) {
        res.status(200).send({message: 'Api placeholder'});
    });

    router.use('/login', authenticationRouter);
    router.use('/comment', commentRouter);
    router.use('/domain', domainRouter);
    router.use('/opinion', opinionRouter);
    router.use('/register', require('./registration')(passport));

    return router;
};

module.exports = APIRoutes;
