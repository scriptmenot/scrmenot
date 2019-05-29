const express = require('express');
const router = express.Router();

const user = require('../controllers').User;

router.get('/', user.retrieve);

module.exports = router;