function calculateSafetyMultiplier(isSafe) {
    return isSafe ? 1 : -1;
}

module.exports = {
    calculateOpinionValue(reliability, isSafe) {
        const safetyMultiplier = calculateSafetyMultiplier(isSafe);

        if(reliability < 0) {
            return 0;
        }
        else {
            return reliability * safetyMultiplier;
        }
    },
    calculateOpinionAuthorValue(reliability, isSafe) {
        const safetyMultiplier = calculateSafetyMultiplier(isSafe);

        if(reliability < 0) {
            return 0;
        }
        else if(reliability < 1) {
            return safetyMultiplier;
        }
        else {
            return reliability * safetyMultiplier;
        }
    }
};
