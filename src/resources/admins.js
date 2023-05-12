const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

router.get('/', (req, res) => {
  if (admins.length === 0) {
    res.status(400).json({
      msg: 'There is no admin created',
    });
  } else {
    res.status(200).json({
      data: admins,
    });
  }
});

router.get('/:id', (req, res) => {
  const adminId = req.params.id;
  const foundAdmin = admins.find((admin) => admin.id.toString() === adminId);
  if (foundAdmin) {
    res.status(200).json({
      data: foundAdmin,
    });
  } else {
    res.status(400).json({
      msg: 'Admin not found',
    });
  }
});

router.post('/', (req, res) => {
  const newAdmin = req.body;
  const foundAdmin = admins.find((admin) => admin.email === newAdmin.email);
  if (foundAdmin) {
    res.status(400).json({
      msg: 'Email is already in use.',
      data: newAdmin,
    });
  } else if (newAdmin.firstName && newAdmin.lastName && newAdmin.email
    && newAdmin.phoneNumber && newAdmin.password && newAdmin.city) {
    newAdmin.id = admins[admins.length - 1].id + 1;
    admins.push(newAdmin);
    fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2), (err) => {
      if (err) {
        res.status(400).json({
          msg: 'Admin cannot be created',
          data: newAdmin,
        });
      } else {
        res.status(200).json({
          msg: 'Admin created succesfully',
          data: newAdmin,
        });
      }
    });
  } else {
    res.status(400).json({
      msg: 'Please review all the fields',
      data: newAdmin,
    });
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
        res.status(400).json({ msg: 'Error' });
      } else {
        res.status(200).json({ msg: 'Admin information updated!', data: adminToUpdate });
      }
    });
  } else {
    res.status(400).json({ msg: 'The admin does not exist' });
  }
});

router.delete('/:id', (req, res) => {
  const adminId = req.params.id;
  const adminExists = admins.some((admin) => admin.id.toString() === adminId);
  if (adminExists) {
    const filteredAdmins = admins.filter((admin) => admin.id.toString() !== adminId);
    fs.writeFile('src/data/admins.json', JSON.stringify(filteredAdmins, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: 'Error' });
      } else {
        res.status(200).json({ msg: 'The admin was deleted' });
      }
    });
  } else {
    res.status(400).json({ msg: `No admin found with id ${adminId}` });
  }
});

module.exports = router;
