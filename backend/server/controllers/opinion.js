const Models = require('../models/')
const Opinion = Models.opinion;
const VoteOpinion = Models.voteOpinion;

module.exports = {
    create(req, res) {
        const payload = req.body;

        return Opinion
            .create({
                    'content': payload.content,
                    'domainId': payload.domainId,
                    'title': payload.title
                })
            .then(obj => res.status(201).send(obj))
            .catch(err => res.status(400).send(err));
    },
    delete(req, res) {
        const opinionId = req.params.id;

        return Opinion.
            destroy({
                    where: {id: opinionId}
                })
            .then(function(rowsDeleted) {
                if(rowsDeleted === 1) {
                    res.status(204).send({message: "deleted"});
                }
                else if(rowsDeleted === 0) {
                    res.status(404).send({message: "not found"});
                }
            })
            .catch(err => res.status(400).send(err))
    },
    retrieveRelatedToDomain(req, res) {
        const domainId = req.params.domainId;
        return Opinion
            .findAll({
                where: {'domainId' : domainId},
                include: [{model: VoteOpinion, as: 'voteOpinion'}],
                order: [['createdAt', 'DESC']]
            })
            .then(opinions => res.status(200).send(opinions))
            .catch(error => res.status(400).send(error));

    },
    update(req, res, next) { 
        Opinion.update(
            {
                "title":  req.body.title,
                "content": req.body.content
            },
            {returning: true, where: {id: req.params.id}}
        )
            .then(function([ rowsUpdate, [updatedDomain] ]) {
                res.status(200).send(updatedDomain);
            })
            .catch(next)
    },
    vote(req, res) {
        const isUpvote = req.body.isUpvote;
        const opinionId = req.body.opinionId;

        let upvoteMultiplier;

        if(isUpvote) {
            upvoteMultiplier = 1;
        }
        else {
            upvoteMultiplier = -1;
        }

        return VoteOpinion
            .create({
                'value': upvoteMultiplier * 1, //TODO: in future it will be somehow multiplied by user reputation
                'opinionId': opinionId
            })
            .then(obj => res.status(201).send(obj))
            .catch(err => res.status(400).send(err));
    }
};