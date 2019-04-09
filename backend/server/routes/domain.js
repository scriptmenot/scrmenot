const express = require('express');
const router = express.Router();

const domainController = require('../controllers').Domain;

router.get('/', function(req, res) {
  res.status(200).send({message: 'respond with a resource'});
});

router.post('/', domainController.create);

module.exports = router;
