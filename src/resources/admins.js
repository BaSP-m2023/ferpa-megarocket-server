const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

router.delete('/delete/:id', (req, res) => {
  const adminId = req.params.id;
  const regex = /^[0-9]+$/;

  if (!regex.test(adminId)) {
    res.status(400).json({ msg: 'Admin ID must contain only numbers' });
  }

  const filteredAdmins = admins.filter((admin) => admin.id.toString() !== adminId);
  const found = admins.find((admin) => admin.id.toString() === adminId);

  if (found) {
    fs.writeFile('src/data/admins.json', JSON.stringify(filteredAdmins, null, 2), (err) => {
      if (err) {
        res.send('Error!');
      } else {
        res.send('Admin deleted.');
      }
    });
  } else {
    res.status(400).json({ msg: `No admin found with id ${adminId}` });
  }
});

router.put('/:id', (req, res) => {
  const adminId = parseInt(req.params.id, 10);
  const adminFound = admins.find((admin) => admin.id === adminId);
  if (adminFound) {
    const newValues = req.body;
    admins.forEach((admin) => {
      if (admin.id === adminId) {
        const oldValues = admin;
        oldValues.firstName = newValues.firstName || oldValues.firstName;
        oldValues.lastName = newValues.lastName || oldValues.lastName;
        oldValues.email = newValues.email || oldValues.email;
        oldValues.phoneNumber = newValues.phoneNumber || oldValues.phoneNumber;
        oldValues.password = newValues.password || oldValues.password;
        oldValues.city = newValues.city || oldValues.city;
        fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2), (err) => {
          if (err) {
            res.send('Error!');
          } else {
            res.status(200).json({ msg: 'Admin information updated!', data: admin });
          }
        });
      }
    });
  } else {
    res.status(400).json({ msg: 'The admin does not exist' });
  }
});

module.exports = router;
