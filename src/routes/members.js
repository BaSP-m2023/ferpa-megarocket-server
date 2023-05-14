const express = require('express');
const membersController = require('../controllers/members');

const router = express.Router();

router
  .get('/:id', membersController.getMemberById)
  .delete('/:id', membersController.deleteMember);

module.exports = router;
