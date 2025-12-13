import { Router } from 'express';
import healthRoutes from './health.routes.js';

import messageRoutes from '../modules/messages/message.routes.js';
import userRoutes from '../modules/users/user.routes.js';

const router = Router();

router.use(healthRoutes);
router.use(userRoutes);
router.use(messageRoutes);

export default router;
