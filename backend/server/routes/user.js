const express = require('express');
const router = express.Router();

const user = require('../controllers').User;

router.get('/count', user.count);
router.get('/', user.retrieve);
router.get('/:id/', user.retrieveById);
module.exports = router;