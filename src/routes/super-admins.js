const express = require('express');
const superAdminsController = require('../controllers/super-admins');
// const validation = require('../validations/super-admins');

const router = express.Router();

router
  .get('/', superAdminsController.getAllsuperAdmins);
/*
  .get('/:id', superAdminsController.getsuperAdminById)
  .post('/', validation.updatesuperAdmin, superAdminsController.updatesuperAdmin)
  .delete('/:id', superAdminsController.deletesuperAdmin)
  .put('/:id', validation.updatesuperAdmin, superAdminsController.updatesuperAdmin);
*/
module.exports = router;
