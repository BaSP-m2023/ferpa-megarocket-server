const express = require('express');
const classesController = require('../controllers/classes');
const validations = require('../validations/classes');

const router = express.Router();

router
  .post('/', validations.validateCreation, classesController.createClass)
  .put('/:id', classesController.updateClass)
  .delete('/:id', classesController.createClass);

module.exports = router;
