const Domain = require('../models/').domain;

module.exports = {
    create(req, res) {
        const payload = req.body;

        console.log("Creating");

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
                attributes: ['id', 'isAccepted', 'safety', 'uri'],
                order: [['id']]
            })
            .then(domains => res.status(200).send(domains))
            .catch(error => res.status(400).send(error));//TODO: better error handling, error handling with next
    },

    retrieveById(req, res) {//TODO: redirect 404 if not found
        return Domain
            .findByPk(req.params.id,
                {attributes: ['id', 'isAccepted', 'safety', 'uri']}
            )
            .then(domain => res.status(200).send(domain))
            .catch(error => res.status(400).send(error));//TODO: better error handling, error handling with next
    },
    update(req, res, next) {  //TODO: refactor this one and upper. Does it handle case when article doesnt exist
        Domain.update(
            req.body,
            {returning: true, where: {id: req.params.id}}
        )
            .then(function([ rowsUpdate, [updatedDomain] ]) {
                res.status(200).send(updatedDomain);
            })
            .catch(next)
    },
    destroy(req, res, next) {
        Domain.
            destroy(
                {where: {id: req.params.id}})
                .then(function(rowsDeleted) {
                    if(rowsDeleted == 1) {
                        res.status(204).send({message: "deleted"});
                    }
                    else if(rowsDeleted == 0) {
                        res.status(404).send({message: "not found"});
                    }
                })
                .catch(next)
}
};