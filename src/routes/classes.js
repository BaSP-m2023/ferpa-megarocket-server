import express from 'express';

import classesController from '../controllers/classes';
import validations from '../validations/classes';

const router = express.Router();

router
  .get('/', classesController.getAllClasses)
  .get('/:id', classesController.getClassById)
  .post('/', validations.validateClassCreation, classesController.createClass)
  .put('/:id', validations.validateClassUpdate, classesController.updateClass)
  .delete('/:id', classesController.deleteClass);

export default router;
