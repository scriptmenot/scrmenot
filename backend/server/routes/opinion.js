const express = require('express');
const router = express.Router();

const opinionController = require('../controllers').Opinion;

router.get('/domain/:domainId', opinionController.retrieveRelatedToDomain);

router.post('/', opinionController.create);

router.delete('/:id', opinionController.delete);

router.put('/:id', opinionController.update)

module.exports = router;
