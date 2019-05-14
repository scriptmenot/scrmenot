module.exports = {
    register(passport) {

        return (req, res) => {
            passport.authenticate('local-signup', (err, user, info) => {
                if (err || !user) {
                    res.status(400).send({success: false, info});
                } else {
                    res.status(200).send({success: true});
                }
            })(req, res);
        }
    }
};
