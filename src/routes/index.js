const express = require('express');

const router = express.Router();
const classes = require('./classes');
const trainers = require('./trainers');

router.use('/classes', classes);
router.use('/trainers', trainers);

module.exports = router;
