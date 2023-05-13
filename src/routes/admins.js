const express = require('express');

const adminsController = require('../controllers/admins');
const validation = require('../validations/admins');

const router = express.Router();

router
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminsById)
  .post('/', validation.validationCreation, adminsController.createAdmins)
  .delete('/:id', adminsController.deleteAdmins)
  .put('/:id', validation.validationUpdate, adminsController.updateAdmins);

module.exports = router;
