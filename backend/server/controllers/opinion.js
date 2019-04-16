const Opinion = require('../models/').opinion;

module.exports = {
    create(req, res) {
        const payload = req.body;

        console.log("Creating");

        return Opinion
            .create({
                    'content': payload.content,
                    'domainId': payload.domainId,
                    'title': payload.title
                })
            .then(obj => res.status(201).send(obj))
            .catch(err => res.status(400).send(err));
    },
    delete(req, res) {

        const opinionId = req.params.id;

        console.log(opinionId);

        return Opinion.
            destroy({
                    where: {id: opinionId}
                })
            .then(function(rowsDeleted) {
                if(rowsDeleted == 1) {
                    res.status(204).send({message: "deleted"});
                }
                else if(rowsDeleted == 0) {
                    res.status(404).send({message: "not found"});
                }
            })
            .catch(err => res.status(400).send(err))
    }
};