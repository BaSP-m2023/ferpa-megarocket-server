import express from 'express';

import subController from '../controllers/subscriptions';
import validations from '../validations/subscriptions';

const router = express.Router();

router
  .get('/all', subController.getAllSub)
  .get('/', subController.getAllSubThisWeek)
  .get('/:id', subController.getSubById)
  .post('/', validations.validateSubCreation, subController.createSub)
  .put('/:id', validations.validateSubUpdate, subController.updateSub)
  .delete('/:id', subController.deleteSub);

export default router;
