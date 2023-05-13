const express = require('express');

const trainerController = require('../controllers/trainers');
// const validation = require('../validations/trainers');

const router = express.Router();

router
  .delete('/:id', trainerController.deleteTrainer)
  .put('/:id', trainerController.updateTrainer);

module.exports = router;