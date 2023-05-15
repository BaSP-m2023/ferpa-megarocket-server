const express = require('express');

const router = express.Router();
const classes = require('./classes');

router.use('/classes', classes);
module.exports = router;
