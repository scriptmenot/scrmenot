const Models = require('../../models/');
const Opinion = Models.opinion;
const VoteOpinion = Models.voteOpinion;
const Fn = require('sequelize').fn;
const Col = require('sequelize').col;

module.exports = {
    retrieveByDomainId(domainId) {

        return Opinion
            .findAll({
                attributes: ['id',
                    'title',
                    'content',
                    'isSafe',
                    'createdAt',
                    'updatedAt',
                    'domainId',
                    [Fn('SUM', Col('voteOpinion.value')), 'rate']
                ],
                where: {'domainId' : domainId},
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
            });
    }
};