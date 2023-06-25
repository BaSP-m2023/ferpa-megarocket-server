const express = require('express');
const adminsController = require('../controllers/admins');
const adminsValidations = require('../validations/admins');

const router = express.Router();

router
  .get('/', adminsController.getAllAdmin)
  .get('/:id', adminsController.getAdminById)
  .put('/:id', adminsValidations.validateAdminUpdate, adminsController.updateAdmin)
  .post('/', adminsValidations.validateAdminCreation, adminsController.createAdmin)
  .delete('/:id', adminsController.deleteAdmin);

module.exports = router;
