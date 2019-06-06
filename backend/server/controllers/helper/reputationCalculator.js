const OpinionRetriever = require('./opinionRetriever');
const CommentCalculator = require('./commentCalculator');

module.exports = {
    calculateReputationByUserId(userId) {
    let promisesToAwait = [
        OpinionRetriever.retrieveByUserId(userId)
            .then(opinions => {
                let reputationSum = 0;

                opinions.forEach(opinion => {
                    const rate = OpinionRetriever.retrieveOpinionRate(opinion);
                    reputationSum += rate;
                });

                return reputationSum;
            }),
        CommentCalculator.calculateByUserId(userId)
    ];

    return Promise.all(promisesToAwait)
        .then(reputationParts => reputationParts.reduce((a, b) => a + b, 0))
    }
};
