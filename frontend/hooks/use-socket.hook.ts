import { SOCKET_URL } from '@/config/api.config';
import { SOCKET_EVENTS } from '@/constants/socket-events.constants';
import { Message } from '@/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (nickname: string, isLoggedIn: boolean) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const socketRef = useRef<Socket | null>(null);

  const disconnect = useCallback(() => {
    socketRef.current?.disconnect();
    socketRef.current = null;
  }, []);

  const sendMessage = useCallback(
    (message: string) => {
      const trimmedMesage = message.trim();
      if (!trimmedMesage || !socketRef.current || !isConnected) return;

      socketRef.current.emit(SOCKET_EVENTS.MESSAGES.SEND, {
        message: trimmedMesage,
      });
    },
    [isConnected],
  );

  useEffect(() => {
    if (!isLoggedIn || !nickname) return;

    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on(SOCKET_EVENTS.CONNECT, () => {
      setIsConnected(true);
      socket.emit(SOCKET_EVENTS.USERS.JOIN, nickname);
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      setIsConnected(false);
    });

    socket.on(SOCKET_EVENTS.MESSAGES.HISTORY, (history: Message[]) => {
      setMessages(history);
    });

    socket.on(SOCKET_EVENTS.MESSAGES.NEW, (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on(SOCKET_EVENTS.USERS.COUNT, (count: number) => {
      setOnlineUsers(count);
    });

    socket.on('error', (err) => {
      console.error('Socket error:', err.message);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isLoggedIn, nickname]);

  return {
    isConnected,
    isLoading: isLoggedIn && !isConnected,
    messages,
    onlineUsers,
    sendMessage,
    disconnect,
  };
};
