import express from 'express';

import trainerController from '../controllers/trainers';
import validation from '../validations/trainers';

const router = express.Router();

router
  .get('/', trainerController.getAllTrainers)
  .get('/:id', trainerController.getTrainerById)
  .post('/', validation.validateTrainerCreation, trainerController.createTrainer)
  .delete('/:id', trainerController.deleteTrainer)
  .put('/:id', validation.validateTrainerUpdate, trainerController.updateTrainer);

export default router;
