const OpinionRetriever = require('./opinionRetriever');
const OpinionValueCalculator = require('./opinionValueCalculator');

module.exports = {
    appendReputationToUser(user) {
        const userId = user.id;

        return OpinionRetriever.retrieveByUserId(userId)
            .then(opinions => {
                let reputationSum = 0;

                opinions.forEach(opinion => {
                    const opinionPayload = opinion.get({plain: true});
                    let rate = parseInt(opinionPayload.rate);

                    if(isNaN(rate)) {
                        rate = 0;
                    }

                    const opinionReliability = OpinionValueCalculator.calculateOpinionReliability(rate);
                    reputationSum += opinionReliability;
                });

                return reputationSum;
            })
            //TODO: calculating domains and comments
            .then(reputationSum => Promise.resolve({...user.get({plain: true}), reputation: reputationSum}));
    }
};
