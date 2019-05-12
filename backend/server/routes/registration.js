const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig').secret;

const authenticationController = require('../controllers').Authentication;

router.post('/', authenticationController.login);

module.exports = router;