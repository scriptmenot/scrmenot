const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig').secret;
const passport = require('passport');

const sendJWTToken = err => {
    if (err) {
        res.status(401).send({success: false, info});
    }
    //TODO: move secret to env variable
    const token = jwt.sign(user, jwtSecret, {expiresIn: '1h'});
    return res.json({user, token});
};

module.exports = {
    login(req, res) {
        passport.authenticate('local-signin', {session: false},
            (err, user, info) => {
                if (err || !user) {
                    res.status(401).send({success: false, info});
                } else {
                    req.login(user, sendJWTToken());
                }
        });
    }
};
