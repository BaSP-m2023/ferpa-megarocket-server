import express from 'express';
import auth from './auth';
import verifyToken from '../middlewares/authMiddleware';

import activities from './activities';
import admins from './admins';
import trainers from './trainers';
import members from './members';
import subscriptions from './subscriptions';
import classes from './classes';
import superAdmins from './super-admins';

const router = express.Router();

router.use('/activities', verifyToken, activities);
router.use('/admins', verifyToken, admins);
router.use('/classes', verifyToken, classes);
router.use('/members', members);
router.use('/trainers', verifyToken, trainers);
router.use('/super-admins', verifyToken, superAdmins);
router.use('/subscriptions', verifyToken, subscriptions);
router.use('/auth', verifyToken, auth);

export default router;
