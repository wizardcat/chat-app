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
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, []);

  const sendMessage = useCallback(
    (message: string) => {
      if (!socketRef.current || !isConnected) return;

      socketRef.current.emit(SOCKET_EVENTS.MESSAGES.SEND, {
        nickname,
        message: message.trim(),
      });
    },
    [isConnected, nickname],
  );

  useEffect(() => {
    if (!isLoggedIn || !nickname) {
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
          setIsConnected(false);
        }
      };
    }

    const socket = io(SOCKET_URL);
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

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    };
  }, [isLoggedIn, nickname, disconnect]);

  return {
    isConnected,
    isLoading: isLoggedIn && !isConnected,
    messages,
    onlineUsers,
    sendMessage,
    disconnect,
  };
};
