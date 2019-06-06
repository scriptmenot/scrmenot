const Models = require('../../models/');
const Comment = Models.comment;


module.exports = {
    calculateByUserId(userId) {
        return Comment
            .count({
                where: {'userId' : userId}
            })
            .then(commentCount => commentCount / 5.0)
    }

};