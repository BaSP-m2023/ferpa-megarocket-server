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

router.put('/:id', (req, res) => {
  const memberId = req.params.id;
  const foundMember = members.find((member) => member.id.toString() === memberId);
  if (foundMember) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id.toString() === memberId) {
        const member2 = member;
        member2.membership = updMember.membership ? updMember.membership : member2.membership;
        member2.firstName = updMember.firstName ? updMember.firstName : member2.firstName;
        member2.lastName = updMember.lastName ? updMember.lastName : member2.lastName;
        member2.dob = updMember.dob ? updMember.dob : member2.dob;
        member2.phone = updMember.phone ? updMember.phone : member2.phone;
        member2.address = updMember.address ? updMember.address : member2.address;
        member2.city = updMember.city ? updMember.city : member2.city;
        member2.zip = updMember.zip ? updMember.zip : member2.zip;
        member2.email = updMember.email ? updMember.email : member2.email;
        member2.password = updMember.password ? updMember.password : member2.password;
        member2.dni = updMember.dni ? updMember.dni : member2.dni;

        fs.writeFile('src/data/member.json', JSON.stringify(members, null, 2), (err) => {
          if (err) {
            res.send('Error! Cant update');
          } else {
            res.send('Member updated');
          }
        });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
