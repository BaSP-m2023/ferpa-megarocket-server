const express = require('express');
const { default: verifyToken } = require('../middlewares/authMiddleware');

const membersController = require('../controllers/members');
const validations = require('../validations/members');

const router = express.Router();

router
  .get('/:id', verifyToken(['SUPER_ADMIN', 'ADMIN', 'MEMBER']), membersController.getMemberById)
  .delete('/:id', verifyToken(['SUPER_ADMIN', 'ADMIN']), membersController.deleteMember)
  .get('/', verifyToken(['SUPER_ADMIN', 'ADMIN']), membersController.getAllMembers)
  .post('/', verifyToken(['SUPER_ADMIN', 'ADMIN']), validations.validateMemberCreation, membersController.createMember)
  .put('/:id', verifyToken(['SUPER_ADMIN', 'ADMIN', 'MEMBER']), validations.validateMemberUpdate, membersController.updateMember);

export default router;
