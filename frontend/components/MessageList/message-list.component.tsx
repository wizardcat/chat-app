import { useAutoScroll } from '@/hooks/use-auto-scroll.hook';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import React from 'react';
import { MessageItem } from '../MessageItem/message-item.component';
import { MessageListProps } from './message-list.props';

export const MessageList = React.memo(({ messages, currentNickname, isLoading }: MessageListProps) => {
  const messagesEndRef = useAutoScroll([messages]);

  return (
    <Box flex={1} overflow="auto" p={2} bgcolor="grey.100">
      <Container maxWidth="lg">
        {isLoading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : messages.length === 0 ? (
          <Box textAlign="center" py={6}>
            <Typography variant="h6" color="text.secondary">
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
});

MessageList.displayName = 'MessageList';
