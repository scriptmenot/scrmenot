const express = require('express');
const router = express.Router();
const passport = require('passport');

const authenticationController = require('../controllers').Authentication;

router.post('/', authenticationController.authenticate);

module.exports = router;
