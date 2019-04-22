const Comment = require('../models/').comment;

module.exports = {
    create(req, res) {
        const payload = req.body;

        return Comment
            .create({
                'content': payload.content,
                'opinionId': payload.opinionId
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
    }
};