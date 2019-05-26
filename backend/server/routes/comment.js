const express = require('express');
const router = express.Router();

const commentController = require('../controllers').Comment;
const requreUserToBeAuthor = commentController.requireUserToBeAuthor;

function createCommentRouter(requireAuth) {
    router.get('/opinion/:opinionId', commentController.retrieveRelatedToOpinion);

    router.post('/', requireAuth, commentController.create);

    router.delete('/:id', requireAuth, requreUserToBeAuthor, commentController.destroy);

    router.put('/:id', requireAuth, requreUserToBeAuthor, commentController.update)

    return router;
}

module.exports = createCommentRouter;
