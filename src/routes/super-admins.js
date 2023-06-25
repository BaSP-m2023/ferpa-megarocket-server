import express from 'express';

import superAdminsController from '../controllers/super-admins';
import validation from '../validations/super-admins';

const router = express.Router();

router
  .get('/', superAdminsController.getAllsuperAdmins)
  .get('/:id', superAdminsController.getsuperAdminById)
  .post('/', validation.validateSuperCreation, superAdminsController.createSuperAdmin)
  .delete('/:id', superAdminsController.deleteSuperAdmin)
  .put('/:id', validation.validateSuperUpdate, superAdminsController.updateSuperAdmin);
export default router;
