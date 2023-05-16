const express = require('express');
const fs = require('fs');
const sAdmin = require('../models/SuperAdmin');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    data: sAdmin,
  });
});

router.get('/:id', (req, res) => {
  const sAdminId = req.params.id;
  const sAdminFound = sAdmin.find((sAdm) => sAdm.id.toString() === sAdminId);
  if (sAdminFound) {
    res.status(200).json({ msg: 'Super admin found', data: sAdminFound });
  } else {
    res.status(400).json({ msg: 'Super admin not found', data: sAdminId });
  }
});

router.post('/', (req, res) => {
  const newSAdmin = req.body;
  sAdmin.push(newSAdmin);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(sAdmin, null, 2), (err) => {
    if (err) {
      res.status(400).json({ msg: 'Error! Super admin cannot be created', data: newSAdmin });
    } else {
      res.status(200).json({ msg: 'Super admin created' });
    }
  });
});

router.delete('/:id', (req, res) => {
  const sAdminId = req.params.id;
  const filterdSAdmin = sAdmin.filter((sAdm) => sAdm.id.toString() !== sAdminId);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(filterdSAdmin, null, 2), (err) => {
    if (err) {
      res.status(400).json({ msg: 'Error! Super admin cannot be deleted: ', data: sAdminId });
    } else {
      res.status(200).json({ msg: 'Super admin deleted: ', data: sAdminId });
    }
  });
});

router.put('/:id', (req, res) => {
  const sAdminId = parseInt(req.params.id, 10);
  const sAdminFound = sAdmin.find((sAdm) => sAdm.id === sAdminId);
  if (sAdminFound) {
    const updSAdmin = req.body;
    sAdminFound.email = updSAdmin.email ? updSAdmin.email : sAdminFound.email;
    sAdminFound.password = updSAdmin.password ? updSAdmin.password : sAdminFound.password;
    const fSadmin = sAdmin.filter((sAdm) => sAdm.id.toString() !== sAdminId);
    fs.writeFile('src/data/super-admins.json', JSON.stringify(fSadmin, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: 'Super admin not found' });
      } else {
        res.status(200).json({ msg: 'Super admin updated: ', data: sAdminFound });
      }
    });
  } else {
    res.status(400).json({ msg: 'Super admin not found' });
  }
});

module.exports = router;
