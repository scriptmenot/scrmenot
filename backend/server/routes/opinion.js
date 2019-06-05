const express = require('express');
const router = express.Router();

const opinionController = require('../controllers').Opinion;
const Opinion = require('../models/').opinion;

function createOpinionRouter(requireAuth, requireUserToBeAuthor) {
    router.get('/domain/:domainId', opinionController.retrieveRelatedToDomain);
    router.get('/user/:userId', opinionController.retrieveRelatedToUser);

    router.post('/', requireAuth, opinionController.create);
    router.post('/vote', requireAuth, opinionController.vote);

    router.delete('/:id', requireAuth, requireUserToBeAuthor(Opinion), opinionController.delete);

    router.put('/:id', requireAuth, requireUserToBeAuthor(Opinion), opinionController.update);

    return router;
}

module.exports = createOpinionRouter;
