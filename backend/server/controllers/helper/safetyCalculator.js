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
                    let rate = parseInt(opinionPayload.rate);

                    if(isNaN(rate)) {
                        rate = 0;
                    }

                    const opinionReliability = OpinionValueCalculator.calculateOpinionReliability(rate);
                    const opinionValue = OpinionValueCalculator.calculateOpinionValue(opinionReliability, isSafe);

                    safetySum += opinionValue;
                });

                let siteSafety = Math.round(safetySum * 1000) / 1000;

                return Promise.resolve({...domain.get({plain: true}), safety: siteSafety});
            });
    }
};
