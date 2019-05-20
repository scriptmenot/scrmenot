const express = require('express');
const router = express.Router();

const authenticationController = require('../controllers').Authentication;

router.post('/', authenticationController.authenticate);

module.exports = router;
