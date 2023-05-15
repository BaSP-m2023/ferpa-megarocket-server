const express = require('express');
const membersController = require('../controllers/members');
const validations = require('../validations/members');

const router = express.Router();

router
  .get('/', membersController.getAllMembers)
  .post('/', validations.validateMemberCreation, membersController.createMember)
  .put('/:id', validations.validateMemberCreation, membersController.updateMember);

module.exports = router;
