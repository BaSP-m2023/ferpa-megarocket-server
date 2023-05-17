const express = require('express');
const classesController = require('../controllers/classes');
const validations = require('../validations/classes');

const router = express.Router();

router
  .get('/', classesController.getAllClasses)
  .get('/:id', classesController.getClassById)
  .post('/', validations.validateClassCreation, classesController.createClass)
  .put('/:id', validations.validateClassUpdate, classesController.updateClass)
  .delete('/:id', classesController.deleteClass);

module.exports = router;
