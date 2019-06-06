module.exports = {
    calculateOpinionReliability(rate) {
        return 1 + rate;
    },
    calculateOpinionValue(reliability, isSafe) {
        const safetyMultiplier = isSafe ? 1 : -1;

        if(reliability < 0) {
            return 0;
        }
        else {
            return reliability * safetyMultiplier;
        }
    }
};
