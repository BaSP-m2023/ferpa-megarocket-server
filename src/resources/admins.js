const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

router.delete('/:id', (req, res) => {
  const adminId = req.params.id;
  const adminExists = admins.some((admin) => admin.id.toString() === adminId);
  if (adminExists) {
    const filteredAdmins = admins.filter((admin) => admin.id.toString() !== adminId);
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
    const adminToUpdate = admins.find((admin) => admin.id === adminId);
    adminToUpdate.firstName = newValues.firstName || adminToUpdate.firstName;
    adminToUpdate.lastName = newValues.lastName || adminToUpdate.lastName;
    adminToUpdate.email = newValues.email || adminToUpdate.email;
    adminToUpdate.phoneNumber = newValues.phoneNumber || adminToUpdate.phoneNumber;
    adminToUpdate.password = newValues.password || adminToUpdate.password;
    adminToUpdate.city = newValues.city || adminToUpdate.city;
    fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2), (err) => {
      if (err) {
        res.send('Error!');
      } else {
        res.status(200).json({ msg: 'Admin information updated!', data: adminToUpdate });
      }
    });
  } else {
    res.status(400).json({ msg: 'The admin does not exist' });
  }
});

module.exports = router;
