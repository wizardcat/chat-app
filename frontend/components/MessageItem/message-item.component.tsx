import { MAX_MESSAGE_WIDTH } from '@/config/api.config';
import { formatTimestamp } from '@/utils/format-timestamp';
import { getAvatarUrl } from '@/utils/get-avatar-url';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { MessageItemProps } from './message-item.props';

export const MessageItem = React.memo(({ message, isOwn }: MessageItemProps) => {
  const avatarUrl = getAvatarUrl(message.nickname);
  const formattedTime = formatTimestamp(message.timestamp);

  return (
    <Box display="flex" justifyContent={isOwn ? 'flex-end' : 'flex-start'} mb={2}>
      <Box display="flex" alignItems="flex-start" maxWidth={MAX_MESSAGE_WIDTH}>
        {!isOwn && <Avatar src={avatarUrl} alt={message.nickname} sx={{ mr: 1 }} />}

        <Box>
          <Box display="flex" alignItems="center" mb={0.5}>
            <Typography variant="caption" fontWeight="bold" mr={1}>
              {message.nickname}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formattedTime}
            </Typography>
          </Box>

          <Paper
            sx={{
              p: 1.5,
              bgcolor: isOwn ? 'primary.main' : 'white',
              color: isOwn ? 'white' : 'text.primary',
              borderRadius: 2,
            }}
          >
            <Typography variant="body1">{message.message}</Typography>
          </Paper>
        </Box>

        {isOwn && <Avatar src={avatarUrl} alt={message.nickname} sx={{ ml: 1 }} />}
      </Box>
    </Box>
  );
});

MessageItem.displayName = 'MessageItem';
