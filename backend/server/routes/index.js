const express = require('express');
const router = express.Router();

const commentRouter = require('./comment');
const domainRouter = require('./domain');
const opinionRouter = require('./opinion');

router.get('/', function(req, res) {
        res.status(200).send({message: 'Api placeholder'});
});

router.use('/comment', commentRouter);
router.use('/domain', domainRouter);
router.use('/opinion', opinionRouter);

module.exports = router;
