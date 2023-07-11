import express from 'express';
import verifyToken from '../middlewares/authMiddleware';

import membersController from '../controllers/members';
import validations from '../validations/members';

const router = express.Router();

router
  .get('/:id', verifyToken, membersController.getMemberById)
  .delete('/:id', verifyToken, membersController.deleteMember)
  .get('/', verifyToken, membersController.getAllMembers)
  .post('/', validations.validateMemberCreation, membersController.createMember)
  .put('/:id', verifyToken, validations.validateMemberUpdate, membersController.updateMember);

export default router;
