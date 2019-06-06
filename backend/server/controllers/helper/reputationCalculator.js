const OpinionRetriever = require('./opinionRetriever');
const OpinionValueCalculator = require('./opinionValueCalculator');
const CommentCalculator = require('./commentCalculator');

module.exports = {
    calculateReputationByUserId(userId) {
    let promisesToAwait = [
        OpinionRetriever.retrieveByUserId(userId)
            .then(opinions => {
                let reputationSum = 0;

                opinions.forEach(opinion => {
                    const rate = OpinionRetriever.retrieveOpinionRate(opinion);
                    const opinionReliability = OpinionValueCalculator.calculateOpinionReliability(rate);
                    reputationSum += opinionReliability;
                });

                return reputationSum;
            }),
        CommentCalculator.calculateByUserId(userId)
    ];

    return Promise.all(promisesToAwait)
        .then(reputationParts => reputationParts.reduce((a, b) => a + b, 0))
    }
};
