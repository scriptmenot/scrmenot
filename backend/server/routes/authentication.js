const express = require('express');
const router = express.Router();

const registrationController = require('../controllers').Registration;

router.post('/', registrationController.register);

module.exports = router;
