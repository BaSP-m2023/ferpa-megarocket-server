const express = require('express');
const adminsController = require('../controllers/admins');
const adminsValidations = require('../validations/admins');

const router = express.Router();

router
  .post('/', adminsValidations.validateAdminCreation, adminsController.createAdmin)
  .delete('/:id', adminsController.deleteAdmin);

module.exports = router;
