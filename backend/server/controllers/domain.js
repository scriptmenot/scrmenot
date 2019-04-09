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
    }
};