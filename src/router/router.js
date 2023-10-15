import express from 'express';

import authRouter from './auth-routes.js';
import usersRouter from './users-routes.js';
import cardsRouter from './cards-routes.js';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/cards', cardsRouter);

export default router;
