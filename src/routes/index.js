const express = require('express');

const router = express.Router();

const admins = require('./admins');
const trainers = require('./trainers');
const members = require('./members');

router.use('/admins', admins);
router.use('/members', members);
router.use('/trainers', trainers);

module.exports = router;
