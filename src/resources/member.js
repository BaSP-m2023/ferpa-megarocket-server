const express = require('express');
const fs = require('fs');

const members = require('../data/member.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ data: members });
});

router.get('/:id', (req, res) => {
  const memberId = req.params.id;
  const foundMember = members.find((member) => member.id.toString() === memberId);
  if (foundMember) {
    res.status(200).json({ data: foundMember });
  } else {
    res.status(400).json({ msg: 'Member not found' });
  }
});

router.post('/', (req, res) => {
  const oldMember = req.body;
  if (!oldMember.firstName || !oldMember.lastName
    || !oldMember.email || !oldMember.password || !oldMember.dni) {
    res.status(400).json({ msg: 'Error! Please complete all the filds' });
  } else {
    const memberId = members[members.length - 1].id + 1;
    const newMember = {
      id: memberId,
      firstName: oldMember.firstName,
      lastName: oldMember.lastName,
      dob: oldMember.dob,
      phone: oldMember.phone,
      address: oldMember.address,
      city: oldMember.city,
      zip: oldMember.zip,
      email: oldMember.email,
      password: oldMember.password,
      dni: oldMember.dni,
    };
    members.push(newMember);
    fs.writeFile('src/data/member.json', JSON.stringify(members, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: 'Error! Member cannot be created' });
      }
      res.status(200).json({ msg: 'Member created!', data: newMember });
    });
  }
});

module.exports = router;
