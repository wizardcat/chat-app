import { models } from '#database';
import { MessageService } from './message.service.js';

export const getLastMessages = async (req, res, next) => {
  try {
    const messageService = new MessageService(models.Message);
    const messages = await messageService.getLastMessages();

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
};