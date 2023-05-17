const express = require('express');
const activityCont = require('../controllers/activites');
const validations = require('../validations/activities');

const router = express.Router();

router
  .get('/', activityCont.getActivities)
  .get('/:id', activityCont.getActivitiesById)
  .post('/', validations.createValidation, activityCont.createActivity)
  .put('/:id', validations.updateValidation, activityCont.updateActivity)
  .delete('/:id', activityCont.deleteActivity);

module.exports = router;
