const express = require('express');

const members = require('../data/member.json');

const router = express.Router();

router.get('/get', (req, res) => {
  res.send(members);
});

module.exports = router;
