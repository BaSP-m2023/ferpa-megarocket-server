const express = require('express');

const router = express.Router();

const trainers = require('./trainers');

router.use('/trainers', trainers);

module.exports = router;
