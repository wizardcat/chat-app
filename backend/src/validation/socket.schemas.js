import { z } from 'zod';

export const joinSchema = z.string().trim().min(2, 'Nickname too short').max(30, 'Nickname too long');

export const sendMessageSchema = z.object({
  message: z.string().trim().min(1, 'Message too short').max(500, 'Message too long'),
});
