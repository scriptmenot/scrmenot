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
    calculateSafetyForDomainId(domainId) {
        OpinionRetriever.retrieveByDomainId(domainId)
            .then(opinions => {
                let safetySum = 0;

                opinions.forEach(opinion => {
                    const opinionPayload = opinion.get({plain: true});
                    const isSafe = opinionPayload.isSafe;
                    const rate = parseInt(opinionPayload.rate);

                    const opinionReliability = calculateOpinionReliability(rate);
                    const opinionValue = calculateOpinionValue(opinionReliability, isSafe);

                    safetySum += opinionValue;
                });

                return safetySum;
            });
    }
};
