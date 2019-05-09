const express = require('express');
const router = express.Router();

const domainController = require('../controllers').Domain;

router.get('/', domainController.retrieve);
router.get('/mostdangerous', domainController.retrieveTop);


router.get('/uri/:uri', domainController.retrieveByUri);
router.get('/:id/', domainController.retrieveById);
//TODO: endpoint for top 5 safest and most dangerous domains

router.post('/', domainController.create);

router.put('/:id/', domainController.update);

router.delete('/:id/', domainController.destroy);

module.exports = router;
