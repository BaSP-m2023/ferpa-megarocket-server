const express = require('express');
const superAdminsController = require('../controllers/super-admins');
const validation = require('../validations/super-admins');

const router = express.Router();

router
  .get('/', superAdminsController.getAllsuperAdmins)
  .get('/:id', superAdminsController.getsuperAdminById)
  .post('/', validation.validateSuperCreation, superAdminsController.createSuperAdmin)
  .delete('/:id', superAdminsController.deleteSuperAdmin)
  .put('/:id', validation.validateSuperUpdate, superAdminsController.updateSuperAdmin);
module.exports = router;
