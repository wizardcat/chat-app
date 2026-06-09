'use client';

import { useChatSession } from '@/hooks/use-chat-session.hook';
import { useSocket } from '@/hooks/use-socket.hook';
import { Box } from '@mui/material';
import { useCallback, useState } from 'react';

import { ChatHeader } from '../ChatHeader/chat-header.component';
import { LoginScreen } from '../LoginScreen/login-screen.component';
import { MessageInput } from '../MessageInput/message-input.component';
import { MessageList } from '../MessageList/message-list.component';

const boxStyles = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
};

export const ChatApp = () => {
  const [newMessage, setNewMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { nickname, login, logout } = useChatSession(setIsLoggedIn);

  const { isConnected, isLoading, messages, onlineUsers, sendMessage, disconnect } = useSocket(
    nickname,
    isLoggedIn,
  );

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !isConnected) return;

    sendMessage(newMessage);
    setNewMessage('');
  }, [newMessage, isConnected, sendMessage]);

  const handleLogout = useCallback(() => {
    disconnect();
    logout();
    setNewMessage('');
  }, [disconnect, logout]);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <Box sx={boxStyles}>
      <ChatHeader nickname={nickname} onlineUsers={onlineUsers} onLogout={handleLogout} />

      <MessageList messages={messages} currentNickname={nickname} isLoading={isLoading} />

      <MessageInput
        value={newMessage}
        onChange={setNewMessage}
        onSend={handleSendMessage}
        disabled={!isConnected}
      />
    </Box>
  );
};
