const OpinionRetriever = require('./opinionRetriever');


const calculateOpinionReliability = function(rate) {
    return 1 + rate * 0.01;
};

const calculateOpinionValue = function(reliability, isSafe) {
    const safetyMultiplier = isSafe ? 1 : -1;

    if(reliability < 0) {
        return 0;
    }
    else {
        return reliability * safetyMultiplier;
    }
};

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

                    const opinionReliability = calculateOpinionReliability(rate);
                    const opinionValue = calculateOpinionValue(opinionReliability, isSafe);

                    safetySum += opinionValue;
                });

                let siteSafety = Math.round(safetySum * 1000) / 1000;

                return Promise.resolve({...domain.get({plain: true}), safety: siteSafety});
            });
    }
};
