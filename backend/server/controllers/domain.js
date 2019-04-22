const Domain = require('../models/').domain;
const Op = require('sequelize').Op; //TODO: might be useful to think of way to import it to every controller at once

module.exports = {
    create(req, res) {
        const payload = req.body;

        return Domain
            .create({
                    'isAccepted': true, //TODO: when we will include voting for reliability, we should set it to false and start voting
                    'safety': 0,
                    'uri': payload.uri
                })
            .then(obj => res.status(201).send(obj))
            .catch(err => res.status(400).send(err));
    },

    retrieve(req, res) {
        return Domain
            .findAll({
                attributes: ['id', 'isAccepted', 'safety', 'uri', 'createdAt'],
                order: [['createdAt', 'DESC']]
            })
            .then(domains => res.status(200).send(domains))
            .catch(error => res.status(400).send(error));
    },

    retrieveByUri(req, res) {
        const uriName = req.params.uri;

        return Domain
            .findAll({
                where: {
                    uri: { [Op.iLike]: '%' + uriName + '%' }
                }
            })
            .then(domains => res.status(200).send(domains))
            .catch(error => res.status(400).send(error));
    },

    retrieveById(req, res) {
        return Domain
            .findByPk(req.params.id,
                {attributes: ['id', 'isAccepted', 'safety', 'uri']}
            )
            .then(domain => res.status(200).send(domain))
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