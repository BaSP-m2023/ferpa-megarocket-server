const express = require('express');

const router = express.Router();

const members = require('./members');
const trainers = require('./trainers');

router.use('/members', members);
router.use('/trainers', trainers);

module.exports = router;
