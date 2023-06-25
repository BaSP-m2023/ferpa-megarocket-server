import express from 'express';
import adminsController from '../controllers/admins';
import adminsValidations from '../validations/admins';

const router = express.Router();

router
  .get('/', adminsController.getAllAdmin)
  .get('/:id', adminsController.getAdminById)
  .put('/:id', adminsValidations.validateAdminUpdate, adminsController.updateAdmin)
  .post('/', adminsValidations.validateAdminCreation, adminsController.createAdmin)
  .delete('/:id', adminsController.deleteAdmin);

export default router;
