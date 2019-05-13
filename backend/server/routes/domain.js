const express = require('express');
const router = express.Router();

const domainController = require('../controllers').Domain;

router.get('/', domainController.retrieve);
router.get('/topdomains', domainController.retrieveTop);

router.get('/uri/:uri', domainController.retrieveByUri);
router.get('/:id/', domainController.retrieveById);

router.post('/', domainController.create);

router.put('/:id/', domainController.update);

router.delete('/:id/', domainController.destroy);

module.exports = router;
