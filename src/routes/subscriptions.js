const express = require('express');
const subController = require('../controllers/subscriptions');
const validations = require('../validations/subscriptions');

const router = express.Router();

router
  .get('/', subController.getAllSubWeek)
  .get('/:id', subController.getSubById)
  .post('/', validations.validateSubCreation, subController.createSub)
  .put('/:id', validations.validateSubUpdate, subController.updateSub)
  .delete('/:id', subController.deleteSub);

module.exports = router;
