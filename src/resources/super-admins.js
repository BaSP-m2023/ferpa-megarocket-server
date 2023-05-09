const express = require('express');
const fs = require('fs');
const sAdmin = require('../data/super-admins.json');

const router = express.Router();
module.exports = router;

router.get('/', (req, res) => {
  res.status(200).json({
    data: sAdmin,
  });
});

router.get('/:id', (req, res) => {
  const sAdminId = req.params.id;
  const sAdminFound = sAdmin.find((sAdm) => sAdm.id.toString() === sAdminId);
  if (sAdminFound) {
    res.status(200).json({
      data: sAdminFound,
    });
  } else {
    res.status(400).json({
      msg: 'Super admin not found',
    });
  }
});

router.post('/', (req, res) => {
  const newSAdmin = req.body;
  sAdmin.push(newSAdmin);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(sAdmin, null, 2), (err) => {
    if (err) {
      res.status(400).json({
        msg: 'Error! Super admin cannot be created',
      });
    } else {
      res.status(200).json({
        msg: 'Super admin created',
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  const sAdminId = req.params.id;
  const filterdSAdmin = sAdmin.filter((sAdm) => sAdm.id.toString() !== sAdminId);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(filterdSAdmin, null, 2), (err) => {
    if (err) {
      res.status(400).json({
        msg: 'Error! Super admin cannot be deleted',
      });
    } else {
      res.status(200).json({
        msg: 'Super admin deleted',
      });
    }
  });
});

router.put('/:id', (req, res) => {
  const sAdminId = parseInt(req.params.id, 10);
  const sAdminFound = sAdmin.some((sAdm) => sAdm.id === sAdminId);

  if (sAdminFound) {
    const updSAdmin = req.body;
    sAdmin.forEach((sAdm) => {
      if (sAdm.id === sAdminId) {
        const sAdm2 = sAdm;
        sAdm2.email = updSAdmin.email ? updSAdmin.email : sAdm2.email;
        sAdm2.password = updSAdmin.password ? updSAdmin.password : sAdm2.password;
        fs.writeFile('src/data/super-admins.json', JSON.stringify(sAdmin, null, 2), (err) => {
          if (err) {
            res.status(400).json({ msg: 'Error! Super admin cannot be created' });
          } else {
            res.status(200).json({ msg: 'Super admin deleted' });
          }
        });
        res.status(200).json({ msg: 'Super admin updated', data: sAdm2 });
      }
    });
  } else {
    res.status(400).json({ msg: 'Super admin not found' });
  }
});

module.exports = router;
