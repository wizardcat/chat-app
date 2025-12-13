import { models } from '#database';
import { UserService } from './user.service.js';

export const getOnlineUsersCount = async (req, res, next) => {
  try {
    const userService = new UserService(models.User);
    const count = await userService.getOnlineUsersCount();
    res.status(200).json({ success: true, onlineUsersCount: count });
  } catch (error) {
    next(error);
  }
};
