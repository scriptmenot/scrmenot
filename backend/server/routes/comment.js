const express = require('express');
const router = express.Router();

const commentController = require('../controllers').Comment;

router.get('/opinion/:opinionId', commentController.retrieveRelatedToOpinion);

router.post('/', commentController.create);

router.delete('/:id', commentController.destroy);

router.put('/:id', commentController.update)

module.exports = router;
