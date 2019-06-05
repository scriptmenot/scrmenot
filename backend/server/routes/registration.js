const express = require('express');
const router = express.Router();

const registration = require('../controllers').Registration;

router.post('/', registration.register);

module.exports = router;