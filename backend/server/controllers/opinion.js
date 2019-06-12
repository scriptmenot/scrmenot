const Models = require('../models/');
const Opinion = Models.opinion;
const VoteOpinion = Models.voteOpinion;
const OpinionRetriever = require('./helper/opinionRetriever');
const ReputationCalculator = require('./helper/reputationCalculator');

function calculateUpvoteMultiplier(isUpvote) {
    if(isUpvote) {
        return 1;
    }
    else {
        return -1;
    }
}

function calculateReputation(reputation) {
    if(reputation < 0 ) {
        return 0.1;
    }
    else if(reputation < 1) {
        return 1
    }

    return reputation;
}

function createVote(reputation, userId, opinionId, isUpvote) {
    const upvoteMultiplier = calculateUpvoteMultiplier(isUpvote);
    const adjustedReputation = calculateReputation(reputation);

    return VoteOpinion.create({
        'value': upvoteMultiplier * adjustedReputation,
        'opinionId': opinionId,
        'isUpvote': isUpvote,
        'userId': userId
    })
}


module.exports = {
    create(req, res) {
        const payload = req.body;
        const userId = req.user.id;

        return ReputationCalculator.calculateReputationByUserId(userId)
            .then(reputation => Opinion
            .create({
                    'content': payload.content,
                    'domainId': payload.domainId,
                    'title': payload.title,
                    'isSafe': payload.isSafe,
                    'value': reputation,
                    'userId': userId
                })
            .then(obj => res.status(201).send(obj))
            .catch(err => res.status(400).send(err)));
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
        return OpinionRetriever.retrieveByDomainId(domainId)
            .then(opinions => res.status(200).send(opinions))
            .catch(error => res.status(400).send(error));

    },
    retrieveRelatedToUser(req, res) {
        const userIdParams = req.params.userId;
        return OpinionRetriever.retrieveByUserId(userIdParams)
            .then(opinions => res.status(200).send(opinions))
            .catch(error => res.status(400).send(error));

    },
    update(req, res, next) {
        Opinion.update(
            {
                "title":  req.body.title,
                "content": req.body.content,
                "isSafe": req.body.isSafe
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
        const userId = req.user.id;

        function getFirstVote(resultVotes) {
            return resultVotes.rows[0].get({plain: true});
        }

        function updateVote(vote) {
            return VoteOpinion.update(
                {
                    "isUpvote": isUpvote,
                    "value": -vote.value
                },
                {returning: true, where: {id: vote.id}})
                .then(function ([rowsUpdate, [updatedVote]]) {
                    res.status(200).send(updatedVote);
                })
                .catch(err => res.status(400).send(err));
        }

        return VoteOpinion.findAndCountAll(({where: {opinionId : opinionId, userId : userId}}))
            .then(resultVotes => {
                if(resultVotes.count > 0) {
                    const vote = getFirstVote(resultVotes);

                    if(vote.isUpvote !== isUpvote) {
                        return updateVote(vote);
                    }
                    return res.status(400).send({message: "User has already voted!"});
                }
                else {
                    ReputationCalculator.calculateReputationByUserId(userId)
                        .then(reputation => createVote(reputation, userId, opinionId, isUpvote))
                        .then(obj => res.status(201).send(obj))
                        .catch(err => res.status(400).send(err));
                }
            });
    }
};