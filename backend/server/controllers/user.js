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
function includeReputationToQueryResult(user){
     let promise = appendReputationToUser(user);
     return Promise.resolve(promise);
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
        const userId = req.params.id;
        return User.findByPk(userId, {
                attributes: ['id',
                    'username',
                    'createdAt'],
            })
            .then(includeReputationToQueryResult)
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error));
    }
};