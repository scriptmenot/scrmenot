const express = require('express');
const router = express.Router();

const opinionController = require('../controllers').Opinion;

router.get('/', function(req, res) {
    res.status(200).send({message: 'respond with a resource'});
});

router.post('/', opinionController.create);

router.delete('/:id', opinionController.delete);

module.exports = router;
