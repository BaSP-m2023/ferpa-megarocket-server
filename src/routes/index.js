const express = require('express');

const router = express.Router();

const superAdmins = require('./super-admins');
const trainers = require('./trainers');

router.use('/trainers', trainers);
router.use('/super-admins', superAdmins);
module.exports = router;
