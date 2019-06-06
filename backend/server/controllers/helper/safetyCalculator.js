const OpinionRetriever = require('./opinionRetriever');
const OpinionValueCalculator = require('./opinionValueCalculator');

module.exports = {
    appendSafetyToDomain(domain) {
        const domainId = domain.id;

        return OpinionRetriever.retrieveByDomainId(domainId)
            .then(opinions => {
                let safetySum = 0;

                opinions.forEach(opinion => {
                    const opinionPayload = opinion.get({plain: true});
                    const isSafe = opinionPayload.isSafe;
                    const opinionAuthorReliability = opinionPayload.value;
                    const opinionAuthorValue = OpinionValueCalculator.calculateOpinionAuthorValue(opinionAuthorReliability, isSafe);

                    let usersRate = parseInt(opinionPayload.rate);
                    if(isNaN(usersRate)) {
                        usersRate = 0;
                    }

                    const userRatesOpinionValue = OpinionValueCalculator.calculateOpinionValue(usersRate, isSafe);
                    const finalOpinionValue = userRatesOpinionValue + opinionAuthorValue;

                    safetySum += finalOpinionValue;
                });

                let siteSafety = Math.round(safetySum * 1000) / 1000;

                return Promise.resolve({...domain.get({plain: true}), safety: siteSafety});
            });
    }
};
