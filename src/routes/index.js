const express = require('express');

const router = express.Router();

const classes = require('./classes');
const superAdmins = require('./super-admins');
const members = require('./members');
const trainers = require('./trainers');
const subscriptions = require('./subscriptions');

router.use('/classes', classes);
router.use('/members', members);
router.use('/trainers', trainers);
router.use('/super-admins', superAdmins);
router.use('/subscriptions', subscriptions);

module.exports = router;
