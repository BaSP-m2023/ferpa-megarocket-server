const express = require('express');
const membersController = require('../controllers/members');
const validations = require('../validations/members');

const router = express.Router();

router
  .get('/:id', membersController.getMemberById)
  .delete('/:id', membersController.deleteMember)
  .get('/', membersController.getAllMembers)
  .post('/', validations.validateMemberCreation, membersController.createMember)
  .put('/:id', validations.validateMemberUpdate, membersController.updateMember);

module.exports = router;
