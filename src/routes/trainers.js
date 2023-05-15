const express = require('express');

const trainerController = require('../controllers/trainers');
const validation = require('../validations/trainers');

const router = express.Router();

router
  .get('/', trainerController.getAllTrainers)
  .get('/:id', trainerController.getTrainerById)
  .post('/', validation.validateTrainerCreation, trainerController.createTrainer)
  .delete('/:id', trainerController.deleteTrainer)
  .put('/:id', validation.validateTrainerUpdate, trainerController.updateTrainer);

module.exports = router;
