const express = require('express');
const router = express.Router();

const commentController = require('../controllers').Comment;

router.get('/opinion/:opinionId', commentController.retrieveRelatedToOpinion);

router.post('/', commentController.create);

module.exports = router;
