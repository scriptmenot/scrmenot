const bCrypt = require('bcrypt');
const jwtSecret = require('../jwtConfig');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/').user;
const PassportJwt = require('passport-jwt');
const JWTStrategy = PassportJwt.Strategy;
const ExtractJWT = PassportJwt.ExtractJwt;

const passport = require('passport');

const serialize = (user, done) => done(null, user.id);

const deserialize = (id, done) => {
    User.findByPk(id).then(foundUser => {
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

        User.findOne({where: {email: email}})
            .then(function(retrievedUser) {
                if(!retrievedUser) {
                    return done(null, false, 'Password and email does not match');
                }
                if(!isValidPassword(retrievedUser.password, password)) {
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
    const generateHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    const username = req.body.username;

    User.findOne({where: {email: email}})
        .then(function(user) {
            if(user) {
                if(user.username === username) {
                    return done(null, false, 'That username is already taken');
                }
                return done(null, false, 'That email is already taken');
            }
            else {
                const userPassword = generateHash(password);

                const newUser = {
                    email: email,
                    password: userPassword,
                    username: req.body.username,
                };

                User.create(newUser).then(function(newUser, created) {
                    if (!newUser) {
                        return done(true, false, 'An error occured during creating user');
                    }
                    if (newUser) {
                        return done(false, newUser);
                    }
                });
            }
        })
        .catch(err => {return done(err, false, 'Something went wrong with registration')});
    }
);

const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret.secret,
};

const jwtLogin = new JWTStrategy(jwtOptions, (jwtPayload, done) => {
    User.findOne({where: {email: jwtPayload.email}})
        .then(user => done(false, user))
        .catch(err => done(err))
});

passport.serializeUser(serialize);
passport.deserializeUser(deserialize);
passport.use('jwt', jwtLogin);
passport.use('local-signin', localLogin);
passport.use('local-signup', localRegister);
