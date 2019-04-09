const express = require('express');
const router = express.Router();
const userRouter = require('./user');

router.get('/', function(req, res) {
        res.status(200).send({message: 'Api placeholder'});
});

router.use('/user', userRouter);

module.exports = router;
