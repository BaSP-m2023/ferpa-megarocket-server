import express from 'express';

import activities from './activities';
import admins from './admins';
import trainers from './trainers';
import members from './members';
import subscriptions from './subscriptions';
import classes from './classes';
import superAdmins from './super-admins';

const router = express.Router();

router.use('/activities', activities);
router.use('/admins', admins);
router.use('/classes', classes);
router.use('/members', members);
router.use('/trainers', trainers);
router.use('/super-admins', superAdmins);
router.use('/subscriptions', subscriptions);

export default router;
