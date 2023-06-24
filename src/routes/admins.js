const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');

const adminsController = require('../controllers/admins');
const adminsValidations = require('../validations/admins');

const router = express.Router();

router
  .get('/', verifyToken(['SUPER_ADMIN']), adminsController.getAllAdmin)
  .get('/:id', verifyToken(['SUPER_ADMIN']), adminsController.getAdminById)
  .put('/:id', verifyToken(['SUPER_ADMIN']), adminsValidations.validateAdminUpdate, adminsController.updateAdmin)
  .post('/', verifyToken(['SUPER_ADMIN']), adminsValidations.validateAdminCreation, adminsController.createAdmin)
  .delete('/:id', verifyToken(['SUPER_ADMIN']), adminsController.deleteAdmin);

module.export = router;
