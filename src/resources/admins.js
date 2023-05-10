/* eslint-disable no-shadow */
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
  const foundAdmin = admins.find((admins) => admins.id.toString() === adminId);
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

  const foundAdmin = admins.find((admins) => admins.email === newAdmin.email);
  if (foundAdmin) {
    res.status(400).json({
      msg: 'Email is already in use.',
      data: newAdmin,
    });
  } else if (newAdmin.firstName && newAdmin.lastName && newAdmin.email
    && newAdmin.phoneNumber && newAdmin.password && newAdmin.city) {
    admins.push(newAdmin);
    fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
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

module.exports = router;
