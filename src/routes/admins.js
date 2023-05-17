const express = require('express');

const adminsController = require('../controllers/admins');
const validation = require('../validations/admins');

const router = express.Router();

router
  .get('/', adminsController.getAllAdmin)
  .get('/:id', adminsController.getAdminById)
  .put('/:id', validation.validateAdminUpdate, adminsController.updateAdmin);

module.exports = router;
