const User = require('../models/').user;
const ReputationCalculator = require('./helper/reputationCalculator');


function appendReputationToUser(user) {
    const userId = user.id;

    return ReputationCalculator.calculateReputationByUserId(userId)
        .then(reputationSum => {return {...user.get({plain: true}), reputation: reputationSum}});
}

function includeReputationToQueryResults(users) {
    let promisesToAwait = [];

    users.forEach(user => {
        let promise = appendReputationToUser(user);
        promisesToAwait.push(promise);
    });

    return Promise.all(promisesToAwait);
}

module.exports = {
    retrieve(req, res) {
        return User
            .findAll({
                attributes: ['id',
                    'username',
                    'createdAt'],
                order: [['createdAt', 'DESC']]
            })
            .then(includeReputationToQueryResults)
            .then(comments => res.status(200).send(comments))
            .catch(error => res.status(400).send(error));
    },
    count(req, res) {
        return User.count()
            .then(userCount => res.status(200).send({count: userCount}));
    },
    
    retrieveById(req, res) {
        return User.findAll({
                attributes: ['id',
                    'username',
                    'email',
                    'createdAt'],
                where :  {id : req.params.id},
                order: [['createdAt', 'DESC']]
            })
            .then(includeReputationToQueryResults)
            .then(user => user[0])
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error));
    }
};