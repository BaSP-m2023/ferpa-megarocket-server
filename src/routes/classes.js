const express = require('express');
const classesController = require('../controllers/classes');
const validations = require('../validations/classes');

const router = express.Router();

router
  .get('/', classesController.getAllClasses)
  .get('/:id', classesController.getClassById)
  .post('/', validations.validateCreation, classesController.createClass);

module.exports = router;
