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

router.delete('/:id', (req, res) => {
  const memberId = req.params.id;
  const fileteredMembers = members.filter((member) => member.id.toString() !== memberId);
  if (fileteredMembers.length === members.length) {
    res.status(400).json({ msg: 'Member not found' });
  } else {
    fs.writeFile('src/data/member.json', JSON.stringify(fileteredMembers, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: 'Error! Member can not be deleted' });
      } else {
        res.status(200).json({ msg: 'Member deleted' });
      }
    });
  }
});

router.put('/:id', (req, res) => {
  const memberId = req.params.id;
  const foundMember = members.find((member) => member.id.toString() === memberId);
  const updMember = req.body;
  if (foundMember) {
    foundMember.membership = updMember.membership ? updMember.membership : foundMember.membership;
    foundMember.firstName = updMember.firstName ? updMember.firstName : foundMember.firstName;
    foundMember.lastName = updMember.lastName ? updMember.lastName : foundMember.lastName;
    foundMember.dob = updMember.dob ? updMember.dob : foundMember.dob;
    foundMember.phone = updMember.phone ? updMember.phone : foundMember.phone;
    foundMember.address = updMember.address ? updMember.address : foundMember.address;
    foundMember.city = updMember.city ? updMember.city : foundMember.city;
    foundMember.zip = updMember.zip ? updMember.zip : foundMember.zip;
    foundMember.email = updMember.email ? updMember.email : foundMember.email;
    foundMember.password = updMember.password ? updMember.password : foundMember.password;
    foundMember.dni = updMember.dni ? updMember.dni : foundMember.dni;

    const fmember = members.filter((member) => member.id.toString() !== memberId);
    fmember.push(foundMember);
    fs.writeFile('src/data/member.json', JSON.stringify(members, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: 'Error! Member cant update' });
      } else {
        res.status(200).json({ msg: 'Member updated' });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
