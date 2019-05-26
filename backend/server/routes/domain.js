const express = require('express');
const router = express.Router();

const domainController = require('../controllers').Domain;
const Domain = require('../models/').domain;

function createDomainRouter(requireAuth, requireUserToBeAuthor) {
    router.get('/', domainController.retrieve);
    router.get('/topdomains', domainController.retrieveTop);
    router.get('/uri/:uri', domainController.retrieveByUri);
    router.get('/:id/', domainController.retrieveById);

    router.post('/', requireAuth, domainController.create);

    router.put('/:id/', requireAuth, requireUserToBeAuthor(Domain), domainController.update);

    router.delete('/:id/', requireAuth, requireUserToBeAuthor(Domain), domainController.destroy);

    return router;
}

module.exports = createDomainRouter;
