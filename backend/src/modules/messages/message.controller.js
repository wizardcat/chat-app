import { models } from '#database';
import { MessageService } from './message.service.js';

export const createMessage = async (req, res, next) => {
  try {
    const { nickname, message } = req.body;
    const messageService = new MessageService(models.Message);
    const newMessage = await messageService.createMessage(nickname, message);

    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    next(error);
  }
};

export const getLastMessages = async (req, res, next) => {
  try {
    const messageService = new MessageService(models.Message);
    const messages = await messageService.getLastMessages();

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
};