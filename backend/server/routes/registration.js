const express = require('express');
const router = express.Router();

const registration = require('../controllers').Registration;

//TODO: should not be allowed when user is already logged in
const registrationRoute = passport => {
    router.post('/', registration.register(passport));

    return router;
};

module.exports = registrationRoute;