const express = require('express');
const router = express.Router();

const domainController = require('../controllers').Domain;

router.get('/', domainController.retrieve);
router.get('/:id/', domainController.retrieveById);
router.post('/', domainController.create);

module.exports = router;
