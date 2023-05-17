const express = require('express');

const router = express.Router();

const members = require('./members');
const trainers = require('./trainers');
const subscriptions = require('./subscriptions');

router.use('/members', members);
router.use('/trainers', trainers);
router.use('/subscriptions', subscriptions);

module.exports = router;
