const express = require('express');

const router = express.Router();
const admins = require('./admins');
const trainers = require('./trainers');

router.use('/admins', admins);
router.use('/trainers', trainers);

module.exports = router;
