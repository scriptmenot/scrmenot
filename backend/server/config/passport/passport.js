const bCrypt = require('bcrypt');
const jwtSecret = require('../jwtConfig');
const LocalStrategy = require('passport-local').Strategy;
const user = require('../../models/user');
const PassportJwt = require('passport-jwt');
const JWTStrategy = PassportJwt.Strategy;
const ExtractJWT = PassportJwt.ExtractJwt;

const serialize = (user, done) => done(null, user.id);

const deserialize = (id, done) => {
    user.findByPk(id).then(foundUser => {
       if(foundUser) {
           done(null, foundUser.get());
       }
       else {
           done(foundUser.errors, null);
       }
    });
};

const localStrategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
};

const localLogin =  new LocalStrategy(localStrategyOptions, function(req, email, password, done) {
        const isValidPassword = (userPassword, password) => bCrypt.compareSync(password, userPassword);

        user.findOne({where: {email: email}})
            .then(function(retrievedUser) {
                if(!retrievedUser) {
                    return done(null, false, 'Password and email does not match');
                }
                if(!isValidPassword(retrievedUser.password, password)) {
                    console.log('Incorrect password');
                    return done(null, false, 'Password and email does not match');
                }

                const userDetails = retrievedUser.get();

                return done(false, userDetails, 'Signup succesfull');
            })
            .catch(err => {
                return done(err, false, 'Something went wrong with login');
            })
    }
);

const localRegister = new LocalStrategy(localStrategyOptions, function(req, email, password, done) {
    console.log("Registration");

    const generateHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

    user.findOne({where: {email: email}})
        .then(function(user) {
            if(user) {
                return done(null, false, 'That email is already taken');
            }
            else {
                const userPassword = generateHash(password);

                const newUser = {
                    email: email,
                    password: userPassword,
                    username: req.body.username,
                };

                user.create(newUser).then(function(newUser, created) {
                    if (!newUser) {
                        return done(true, false, 'An error occured during creating user');
                    }
                    if (newUser) {
                        return done(false, newUser);
                    }
                });
            }
        });
    }
);

const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret.secret,
};

const jwtLogin = new JWTStrategy(jwtOptions, (jwtPayload, done) => {
    user.findOne({where: {email: jwtPayload.email}})
        .then(user => done(false, user))
        .catch(err => done(err))
});

prepareStrategiesForLoginAndRegistration = passport => {
        passport.serializeUser(serialize);
        passport.deserializeUser(deserialize);
        passport.use('jwt', jwtLogin);
        passport.use('local-signin', localLogin);
        passport.use('local-signup', localRegister);
};

module.exports = prepareStrategiesForLoginAndRegistration;