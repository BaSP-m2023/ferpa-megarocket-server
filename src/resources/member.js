const express = require('express');
const fs = require('fs');

const members = require('../data/member.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ members });
});

router.get('/:id', (req, res) => {
  const memberId = req.params.id;
  const foundMember = members.find((member) => member.id.toString() === memberId);
  if (foundMember) {
    res.status(200).json({ foundMember });
  } else {
    res.status(400).json({ msg: 'Member not found' });
  }
});

router.post('/post', (req, res) => {
  const newMember = req.body;
  if (!newMember.id) {
    res.status(400).json({ msg: 'Error! Invalid member ID' });
  } else {
    const existingMember = members.find((member) => member.id === newMember.id);
    if (!existingMember) {
      members.push(newMember);
      fs.writeFile('src/data/member.json', JSON.stringify(members, null, 2), (err) => {
        if (err) {
          res.status(400).json({ msg: 'Error! Member cannot be created' });
        } else {
          res.status(200).json({ msg: 'Member created!' });
        }
      });
    } else {
      res.status(400).json({ msg: 'Error! Member with this ID already exists' });
    }
  }
});

module.exports = router;
