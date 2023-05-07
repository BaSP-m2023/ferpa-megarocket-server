const express = require('express');
const fs = require('fs');
const members = require('../data/member.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(members);
});

router.delete('/:id', (req, res) => {
  const memberId = req.params.id;
  const fileteredMembers = members.filter((member) => member.id.toString() !== memberId);
  if (fileteredMembers.length === members.length) {
    res.send('Member not found');
  } else {
    fs.writeFile('src/data/member.json', JSON.stringify(fileteredMembers, null, 2), (err) => {
      if (err) {
        res.send('Error! Member can not be deleted');
      } else {
        res.send('Member deleted');
      }
    });
  }
});

module.exports = router;
