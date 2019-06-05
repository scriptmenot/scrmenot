const Comment = require('../models/').comment;

module.exports = {
    create(req, res) {
        const payload = req.body;
        const userId = req.user.id;

        return Comment
            .create({
                'content': payload.content,
                'opinionId': payload.opinionId,
                'userId': userId
            })
            .then(obj => res.status(201).send(obj))
            .catch(err => res.status(400).send(err));
    },
    retrieveRelatedToOpinion(req, res) {
        const opinionId = req.params.opinionId;

        return Comment
            .findAll({
                where: {'opinionId' : opinionId},
                order: [['createdAt', 'DESC']]
            })
            .then(comments => res.status(200).send(comments))
            .catch(error => res.status(400).send(error));
    },
    retrieveRelatedToUser(req, res) {
        const userIdParams = req.params.userId;

        return Comment
            .findAll({
                where: {'userId' : userIdParams},
                order: [['createdAt', 'DESC']]
            })
            .then(comments => res.status(200).send(comments))
            .catch(error => res.status(400).send(error));

    },
    count(req, res) {
        return Comment.count()
            .then(commentCount => res.status(200).send({count: commentCount}));
    },
    update(req, res, next) {

        Comment.update(
            {
                "content": req.body.content
            },
            {returning: true, where: {id: req.params.id}}
        )
            .then(function([ rowsUpdate, [updatedComment] ]) {
                res.status(200).send(updatedComment);
            })
            .catch(err => res.status(400).send(err))
    },
    destroy(req, res, next) {

        Comment.
            destroy({where: {id: req.params.id}})
            .then(function(rowsDeleted) {
                if(rowsDeleted === 1) {
                    res.status(204).send({message: "deleted"});
                }
                else if(rowsDeleted === 0) {
                    res.status(404).send({message: "not found"});
                }
            })  
            .catch(err => res.status(400).send(err))
    }
};