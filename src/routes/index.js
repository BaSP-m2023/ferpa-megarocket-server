const express = require('express');

const router = express.Router();

const admins = require('./admins');
const trainers = require('./trainers');
const members = require('./members');
const subscriptions = require('./subscriptions');
const classes = require('./classes');
const superAdmins = require('./super-admins');

router.use('/admins', admins);
router.use('/classes', classes);
router.use('/members', members);
router.use('/trainers', trainers);
router.use('/super-admins', superAdmins);
router.use('/subscriptions', subscriptions);

module.exports = router;
