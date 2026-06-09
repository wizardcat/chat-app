import { useAutoScroll } from '@/hooks/useAutoScroll';
import { Message } from '@/types';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import React from 'react';
import { MessageItem } from './MessageItem';

export interface MessageListProps {
  messages: Message[];
  currentNickname: string;
  isLoading: boolean;
}

export const MessageList = React.memo(
  ({ messages, currentNickname, isLoading }: MessageListProps) => {
    const messagesEndRef = useAutoScroll([messages]);

    return (
      <Box flex={1} overflow="auto" bgcolor="background.default" py={2}>
        <Container maxWidth="lg">
          {isLoading ? (
            <Box display="flex" justifyContent="center" py={6}>
              <CircularProgress />
            </Box>
          ) : messages.length === 0 ? (
            <Box textAlign="center" py={6}>
              <Typography variant="body1" color="text.secondary">
                No messages yet. Start the conversation!
              </Typography>
            </Box>
          ) : (
            messages.map((msg) => (
              <MessageItem key={msg.id} message={msg} isOwn={msg.nickname === currentNickname} />
            ))
          )}

          <div ref={messagesEndRef} />
        </Container>
      </Box>
    );
  },
);

MessageList.displayName = 'MessageList';
