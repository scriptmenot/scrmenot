const bCrypt = require('bcrypt');
const jwtSecret = require('../jwtConfig');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require('../../models/user');
const PassportJwt = require('passport-jwt');
const JWTStrategy = PassportJwt.Strategy;
const ExtractJWT = PassportJwt.ExtractJwt;


const localStrategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
};

const localLogin =  new LocalStrategy(localStrategyOptions, function(req, email, password, done) {
        const isValidPassword = (userPassword, password) => bCrypt.compareSync(password, userPassword);

        user.findOne({where: {email: email}})
            .then(function(author) {
                if(!author) {
                    return done(null, false, 'Password and email does not match');
                }
                if(!isValidPassword(author.password, password)) {
                    console.log('Incorrect password');
                    return done(null, false, 'Password and email does not match');
                }

                const userDetails = author.get();

                return done(false, user, 'Signup succesfull');
            })
            .catch(err => {
                return done(err, false, 'Something went wrong with login');
            })
    }
);

const localRegister = new LocalStrategy(localStrategyOptions, function(req, email, password, done) {
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
                        firstName: req.body.firstName,
                        surname: req.body.surname,
                        username: req.body.username,
                        description: req.body.description
                    };

                    user.create(newUser).then(function(newUser, created) {
                        if (!newUser) {
                            return done(true, false, 'An error occured during creating author');
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

passport.use('jwt', jwtLogin);
passport.use('local-signin', localLogin);
passport.use('local-signup', localLogin);