const User = require('../models/').user;
const ReputationCalculator = require('./helper/reputationCalculator');


function includeReputationToQueryResults(domains) {
    let promisesToAwait = [];

    domains.forEach(user => {
        let promise = ReputationCalculator.appendReputationToUser(user);
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
    }
};