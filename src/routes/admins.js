const express = require('express');
const adminsController = require('../controllers/admins');
const validations = require('../validations/admins');

const router = express.Router();

router
  .post('/', validations.validateCreation, adminsController.createAdmin)
  .delete('/', adminsController.deleteAdmin);

module.exports = router;
