const Models = require('../models/');
const Domain = Models.domain;
const Op = require('sequelize').Op; //TODO: might be useful to think of way to import it to every controller at once
const SafetyCalculator = require('./helper/safetyCalculator');


const retrieveDomainQuery = {
    attributes: ['id',
        'isAccepted',
        'uri',
        'createdAt'],
    order: [['createdAt', 'DESC']]
};

function includeSafetyToQueryResult(domain) {
    let promise = SafetyCalculator.appendSafetyToDomain(domain);
    return Promise.resolve(promise);
}

function includeSafetyToQueryResults(domains) {
    let promisesToAwait = [];

    domains.forEach(domain => {
        let promise = SafetyCalculator.appendSafetyToDomain(domain);
        promisesToAwait.push(promise);
    });

    return Promise.all(promisesToAwait);
}

module.exports = {
    create(req, res) {
        const payload = req.body;
        
        return Domain
        .findAll({
            attributes: ['id'],
            where : {uri : payload.uri}
        })
        .then(
            function(domains){
                if(domains.length == 0){
                    return Domain
                        .create({
                        'isAccepted': true, //TODO: when we will include voting for reliability, we should set it to false and start voting
                        'uri': payload.uri
                         })
                        .then(obj => res.status(200).send(obj.dataValues))
                }
                else{
                    return res.status(400).send({
                        message : 'This domain already exists.',
                        url : '/api/domain/' + domains[0]['id']

                    });
                }
            }                 
        )
        
    },
    
    retrieve(req, res) {
        return Domain
            .findAll(retrieveDomainQuery)
            .then(includeSafetyToQueryResults)
            .then(s => res.status(200).send(s))
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
            .then(includeSafetyToQueryResults)
            .then(domains => res.status(200).send(domains))
            .catch(error => res.status(400).send(error));
    },

    retrieveById(req, res) {
        return Domain
            .findByPk(req.params.id, retrieveDomainQuery)
            .then(includeSafetyToQueryResult)
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
            .then(includeSafetyToQueryResults)
            .then(function(domains){
                let arr = [];
                for (let i in domains){
                    arr.push(domains[i]);
                }
                arr.sort(GetSortOrder('safety'));
                    
                if (req.query.safe == 'true'){
                    arr.reverse();
                }
                if(req.query.count === undefined) {
                        count = 5}
                else {
                     count = req.query.count;
                }       

                arr = arr.slice(0, count)
                
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