const express = require('express');
const router = express.Router();

const domainController = require('../controllers').Domain;

function createDomainRouter(requireAuth) {
    router.get('/', domainController.retrieve);
    router.get('/topdomains', domainController.retrieveTop);
    router.get('/uri/:uri', domainController.retrieveByUri);
    router.get('/:id/', domainController.retrieveById);

    router.post('/', requireAuth, domainController.create);

    router.put('/:id/', requireAuth, domainController.update);

    router.delete('/:id/', requireAuth, domainController.destroy);

    return router;
}

module.exports = createDomainRouter;
