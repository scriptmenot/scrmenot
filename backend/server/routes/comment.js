const express = require('express');
const router = express.Router();

const commentController = require('../controllers').Comment;
const Comment = require('../models/').comment;

function createCommentRouter(requireAuth, requireUserToBeAuthor) {
    router.get('/opinion/:opinionId', commentController.retrieveRelatedToOpinion);
    router.get('/user/:userId', commentController.retrieveRelatedToUser);

    router.post('/', requireAuth, commentController.create);

    router.delete('/:id', requireAuth, requireUserToBeAuthor(Comment), commentController.destroy);

    router.put('/:id', requireAuth, requireUserToBeAuthor(Comment), commentController.update);

    return router;
}

module.exports = createCommentRouter;
