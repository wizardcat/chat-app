import { models } from '#database';
import { Server } from 'socket.io';
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

  io.on('connection', socket => {
    console.log('User connected:', socket.id);

    socket.on('disconnect', async () => {
      try {
        await userService.deleteUserBySocketId(socket.id);

        const onlineCount = await userService.getOnlineUsersCount();

        io.emit('users:count', onlineCount);

        console.log('User disconnected:', socket.id);
      } catch (error) {
        console.error('Error on user disconnect:', error);
      }
    });

    socket.on('user:join', async nickname => {
      try {
        await userService.createUser(nickname, socket.id);

        socket.nickname = nickname;

        const recentMessages = await messageService.getLastMessages();

        socket.emit('messages:history', recentMessages);

        const onlineCount = await userService.getOnlineUsersCount();
        
        io.emit('users:count', onlineCount);

        console.log(`${nickname} joined the chat`);
      } catch (error) {
        console.error('Error on user join:', error);
      }
    });

    socket.on('message:send', async data => {
      try {
        const { nickname, message } = data;

        const newMessage = await messageService.createMessage(nickname, message);

        io.emit('message:new', newMessage);

        console.log(`${nickname}: ${message}`);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });
  });

  return io;
};
