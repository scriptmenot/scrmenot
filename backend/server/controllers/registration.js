const passport = require('passport');

module.exports = {
    register(req, res) {
        passport.authenticate('local-signup', (err, user, info) => {
            if(err || !user) {
                res.status(400).send({success: false, info});
            }
            else {
                res.status(200).send({success: true});
            }
        });
    }
};
