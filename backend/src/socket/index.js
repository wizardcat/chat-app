import { models } from '#database';
import { Server } from 'socket.io';
import { SOCKET_EVENTS } from '../constants/socket-events.constants.js';
import { MessageService } from '../modules/messages/message.service.js';
import { UserService } from '../modules/users/user.service.js';

export const initializeSocketIO = httpServer => {
  if (!models.User) {
    throw new Error('User model not initialized');
  }
  const userService = new UserService(models.User);
  const messageService = new MessageService(models.Message);

  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || '*',
      // methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on(SOCKET_EVENTS.CONNECTION, socket => {
    console.log('User connected:', socket.id);

    socket.on(SOCKET_EVENTS.DISCONNECT, async () => {
      try {
        await userService.deleteUserBySocketId(socket.id);

        const onlineCount = await userService.getOnlineUsersCount();

        io.emit(SOCKET_EVENTS.USERS.COUNT, onlineCount);

        console.log('User disconnected:', socket.id);
      } catch (error) {
        console.error('Error on user disconnect:', error);
      }
    });

    socket.on(SOCKET_EVENTS.USERS.JOIN, async nickname => {
      try {
        await userService.createUser(nickname, socket.id);

        socket.nickname = nickname;

        const recentMessages = await messageService.getLastMessages();

        socket.emit(SOCKET_EVENTS.MESSAGES.HISTORY, recentMessages.reverse());

        const onlineCount = await userService.getOnlineUsersCount();

        io.emit(SOCKET_EVENTS.USERS.COUNT, onlineCount);

        console.log(`${nickname} joined the chat`);
      } catch (error) {
        console.error('Error on user join:', error);
      }
    });

    socket.on(SOCKET_EVENTS.MESSAGES.SEND, async data => {
      try {
        const { nickname, message } = data;

        const newMessage = await messageService.createMessage(nickname, message);

        io.emit(SOCKET_EVENTS.MESSAGES.NEW, newMessage);

        console.log(`${nickname}: ${message}`);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });
  });

  return io;
};
