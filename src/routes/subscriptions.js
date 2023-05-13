const express = require('express');
const subController = require('../controllers/subscriptions');
// const validations = require('../validations/subscriptions');

const router = express.Router();

router
  .get('/', subController.getAllSub)
  .get('/:id', subController.getSubById);
// .post('/', validations.validateSub, subController.createSub)
// .delete('/:id', subController.deleteSub)
// .put('/:id', validations.validateSub, subController.updateSub);

module.exports = router;
