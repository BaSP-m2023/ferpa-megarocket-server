const express = require('express');

const router = express.Router();
const superAdmins = require('./super-admins');

router.use('/super-admins', superAdmins);

module.exports = router;
