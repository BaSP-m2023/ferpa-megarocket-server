const express = require('express');
const subController = require('../controllers/subscriptions');
const validations = require('../validations/subscriptions');

const router = express.Router();

router
  .get('/', subController.getAllSub)
  .get('/:id', subController.getSubById)
  .post('/', validations.validateSubCreation, subController.createSub);
// .put('/:id', validations.validateSub, subController.updateSub)
// .delete('/:id', subController.deleteSub);

module.exports = router;
