const express = require('express');

const router = express.Router();
const subscriptions = require('./subscriptions');

router.use('/subscriptions', subscriptions);

module.exports = router;
