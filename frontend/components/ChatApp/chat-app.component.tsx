'use client';
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
  const [nickname, setNickname] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const isLoggedIn = Boolean(nickname.trim());

  const { isConnected, isLoading, messages, onlineUsers, sendMessage, disconnect } = useSocket(
    nickname,
    isLoggedIn,
  );

  const handleLogin = useCallback((nickname: string) => {
    const trimmedNickname = nickname.trim();

    if (trimmedNickname) {
      setNickname(trimmedNickname);
    }
  }, []);

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() && isConnected) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  }, [newMessage, isConnected, sendMessage]);

  const handleLogout = useCallback(() => {
    disconnect();
    setNickname('');
    setNewMessage('');
  }, [disconnect]);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
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
