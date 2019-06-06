const Models = require('../../models/');
const Opinion = Models.opinion;
const VoteOpinion = Models.voteOpinion;
const Fn = require('sequelize').fn;
const Col = require('sequelize').col;

const retrieveSettings = {
    attributes: ['id',
        'title',
        'content',
        'isSafe',
        'createdAt',
        'updatedAt',
        'domainId',
        'userId',
        [Fn('SUM', Col('voteOpinion.value')), 'rate']
    ],
    group: ['opinion.id'],
    include: [
        {
            model: VoteOpinion,
            as: 'voteOpinion',
            attributes: [
            ]
        }
    ],
    order: [['createdAt', 'DESC']]
};

module.exports = {
    retrieveByDomainId(domainId) {
        return Opinion
            .findAll({
                ...retrieveSettings,
                where: {'domainId' : domainId}
            });
    },
    retrieveByUserId(userId) {
        return Opinion
            .findAll({
                ...retrieveSettings,
                where: {'userId' : userId}
            });
    },
    retrieveOpinionRate(opinion) {
        const opinionPayload = opinion.get({plain: true});
        let rate = parseInt(opinionPayload.rate);

        if(isNaN(rate)) {
            rate = 0;
        }

        return rate;
    }

};