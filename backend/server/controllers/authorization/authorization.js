function requireUserToBeAuthor(model) {
    return (req, res, next) => {
        const commentToRetrieve = req.params.id;
        const currentUserId = req.user.id;

        model.count({
            where: {id: commentToRetrieve, userId: currentUserId}
        })
            .then(count => {
                if(count === 0) {
                    res.status(403).send({
                        message : 'User is not an author of this content.'
                    });
                }
                else {
                    next();
                }
            });
    }
}


module.exports = requireUserToBeAuthor;