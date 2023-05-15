const express = require('express');

const router = express.Router();

const activities = require('./activities');

router.use('/activities', activities);

module.exports = router;
