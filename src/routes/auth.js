import express from 'express';

import getAuth from '../controllers/auth';

const router = express.Router();

router.get('/', getAuth);

export default router;
