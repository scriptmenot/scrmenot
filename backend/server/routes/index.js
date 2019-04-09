const express = require('express');
const router = express.Router();
const domainRouter = require('./domain');

router.get('/', function(req, res) {
        res.status(200).send({message: 'Api placeholder'});
});

router.use('/domain', domainRouter);

module.exports = router;
