import express from 'express';
import activityCont from '../controllers/activites';
import validations from '../validations/activities';

const router = express.Router();

router
  .get('/', activityCont.getActivities)
  .get('/:id', activityCont.getActivitiesById)
  .post('/', validations.createValidation, activityCont.createActivity)
  .put('/:id', validations.updateValidation, activityCont.updateActivity)
  .delete('/:id', activityCont.deleteActivity);

export default router;
