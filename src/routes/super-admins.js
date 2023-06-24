const express = require('express');
const superAdminsController = require('../controllers/super-admins');
const validation = require('../validations/super-admins');
const { default: verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .get('/', verifyToken(['SUPER_ADMIN']), superAdminsController.getAllsuperAdmins)
  .get('/:id', verifyToken(['SUPER_ADMIN']), superAdminsController.getsuperAdminById)
  .post('/', verifyToken(['SUPER_ADMIN']), validation.validateSuperCreation, superAdminsController.createSuperAdmin)
  .delete('/:id', verifyToken(['SUPER_ADMIN']), superAdminsController.deleteSuperAdmin)
  .put('/:id', verifyToken(['SUPER_ADMIN']), validation.validateSuperUpdate, superAdminsController.updateSuperAdmin);
module.exports = router;
