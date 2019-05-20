const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig').secret;
const passport = require('passport');

module.exports = {
    authenticate(req, res) {
        passport.authenticate('local-signin', {session: false},
            (err, user, info) => {
                if (err || !user) {
                    res.status(401).send({success: false, info});
                } else {
                    const token = jwt.sign(user, jwtSecret, {expiresIn: '1h'});
                    console.log(token);
                    return res.json({user, token});
                }
        })(req, res);
    }
};
