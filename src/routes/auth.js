const express = require('express');

const getAuth = require('../controllers/auth');

const router = express.Router();

router.get('/', getAuth);

module.exports = router;
