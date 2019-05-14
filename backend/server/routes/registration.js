const express = require('express');
const router = express.Router();

const registration = require('../controllers').Registration;

//TODO: should not be allowed when user is already logged in
router.post('/', registration.register);

module.exports = router;