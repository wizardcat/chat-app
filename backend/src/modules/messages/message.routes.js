import { Router } from 'express';
import * as messageController from './message.controller.js';

const router = Router();

router.get('/messages', messageController.getLastMessages);

export default router;
