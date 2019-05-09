const Models = require('../models/')
const Domain = Models.domain;
const Opinion = Models.opinion;
const VoteOpinion = Models.voteOpinion;
const Op = require('sequelize').Op; //TODO: might be useful to think of way to import it to every controller at once
const Fn = require('sequelize').fn;
const Col = require('sequelize').col;

const retrieveDomainQuery = {
    attributes: ['id',
        'isAccepted',
        'uri',
        [Fn('SUM', Col('opinion->voteOpinion.value')), 'safety'],
        'createdAt'],
    group: ['domain.id'],
    include: [
        {
            model: Opinion,
            as: 'opinion',
            attributes: [],
            order: [['createdAt','DESC']],
            include: [
                {
                    model: VoteOpinion,
                    as: 'voteOpinion',
                    order: [['createdAt', 'DESC']],
                    attributes: [
                    ]
                }
            ]
        }
    ],
    order: [['createdAt', 'DESC']]
};

module.exports = {
    create(req, res) {
        const payload = req.body;
        
        return Domain
            .create({
                    'isAccepted': true, //TODO: when we will include voting for reliability, we should set it to false and start voting
                    'uri': payload.uri
                })
            .then(obj => res.status(201).send(obj))
            .catch(err => res.status(400).send(err));
    },

    retrieve(req, res) {
        return Domain
            .findAll(retrieveDomainQuery)
            .then(domains => res.status(200).send(domains))
            .catch(error => res.status(400).send(error));
    },

    retrieveByUri(req, res) {
        const uriName = req.params.uri;

        return Domain
            .findAll({
                ...retrieveDomainQuery,
                where: {
                    uri: { [Op.iLike]: '%' + uriName + '%' }
                }
            })
            .then(domains => res.status(200).send(domains))
            .catch(error => res.status(400).send(error));
    },


    retrieveById(req, res) {
        return Domain
            .findByPk(req.params.id, retrieveDomainQuery)
            .then(domain => res.status(200).send(domain))
            .catch(error => res.status(400).send(error));
    },
    retrieveTop(req, res){
        function GetSortOrder(prop) {  
            return function(a, b) {  
                if (a[prop] > b[prop]) {  
                    return 1;  
                } else if (a[prop] < b[prop]) {  
                 return -1;  
                 }  
                return 0;  
            }
        }

        return Domain
            .findAll(retrieveDomainQuery)
            .then(function(domains){
                arr = [];
                for (var i in domains){
                    arr.push(domains[i]['dataValues']);
                }
                arr.sort(GetSortOrder('safety'));
                
                if (req.query.safe == 'true'){
                    arr.reverse();
                }

                if (req.query.count === 'undefined'){
                    arr = arr.slice(0,5)
                }
                else{
                     arr = arr.slice(0,req.query.count);
                }
                res.status(200).json(arr);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res, next) { 
        Domain.update(
            {
                "isAccepted": req.body.isAccepted,
                "uri": req.body.uri
            },
            {returning: true, where: {id: req.params.id}}
        )
            .then(function([ rowsUpdate, [updatedDomain] ]) {
                res.status(200).send(updatedDomain);
            })
            .catch(err => res.status(400).send(err))
    },
    
    destroy(req, res, next) {
        Domain.
            destroy({where: {id: req.params.id}})
            .then(function(rowsDeleted) {
                if(rowsDeleted === 1) {
                    res.status(204).send({message: "deleted"});
                }
                else if(rowsDeleted === 0) {
                    res.status(404).send({message: "not found"});
                }
            })  
            .catch(err => res.status(400).send(err))
    }
};