const express = require('express');

const members = require('../data/member.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(members);
});

router.get('/:id', (req, res) => {
  const memberId = req.params.id;
  const foundMember = members.find((member) => member.id.toString() === memberId);
  if (foundMember) {
    res.send(foundMember);
  } else {
    res.send('Member not found');
  }
});

module.exports = router;
