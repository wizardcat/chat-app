import { Router } from 'express';
import * as userController from './user.controller.js';

const router = Router();

router.get('/users/online', userController.getOnlineUsersCount);

export default router;
