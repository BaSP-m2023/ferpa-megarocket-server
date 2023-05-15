const express = require('express');
const activityCont = require('../controllers/activites');

const router = express.Router();

router
  .get('/', activityCont.getActivities)
  .get('/:id', activityCont.getActivitiesById)
  .post('/', activityCont.createActivity)
  .put('/:id', activityCont.updateActivity)
  .delete('/:id', activityCont.deleteActivity);

module.exports = router;
