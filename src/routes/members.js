import express from 'express';

import membersController from '../controllers/members';
import validations from '../validations/members';

const router = express.Router();

router
  .get('/:id', membersController.getMemberById)
  .delete('/:id', membersController.deleteMember)
  .get('/', membersController.getAllMembers)
  .post('/', validations.validateMemberCreation, membersController.createMember)
  .put('/:id', validations.validateMemberUpdate, membersController.updateMember);

export default router;
