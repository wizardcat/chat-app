import { MAX_MESSAGE_WIDTH } from '@/config/api.config';
import { Message } from '@/types';
import { formatTimestamp } from '@/utils/format-timestamp';
import { getAvatarUrl } from '@/utils/get-avatar-url';
import { Avatar, Box, Paper, Theme, Typography } from '@mui/material';
import React from 'react';

export interface MessageItemProps {
  message: Message;
  isOwn: boolean;
}

const avatarStyles = {
  width: 32,
  height: 32,
  mr: 1,
};

const paperStyles = (isOwn: boolean) => (theme: Theme) => ({
  p: 1.5,
  bgcolor: isOwn ? theme.palette.success.light : theme.palette.common.white,
  borderRadius: 2,
});

export const MessageItem = React.memo(({ message, isOwn }: MessageItemProps) => {
  const avatarUrl = getAvatarUrl(message.nickname);
  const formattedTime = formatTimestamp(message.timestamp);

  return (
    <Box display="flex" justifyContent={isOwn ? 'flex-end' : 'flex-start'} mb={2}>
      <Box display="flex" alignItems="flex-start" maxWidth={MAX_MESSAGE_WIDTH}>
        {!isOwn && <Avatar src={avatarUrl} alt={message.nickname} sx={avatarStyles} />}
        <Box>
          <Box display="flex" alignItems="center" mb={0.5}>
            <Typography variant="caption" color="text.secondary" fontWeight="bold" mr={1}>
              {message.nickname}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formattedTime}
            </Typography>
          </Box>

          <Paper sx={paperStyles(isOwn)}>
            <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
              {message.message}
            </Typography>
          </Paper>
        </Box>
        {isOwn && <Avatar src={avatarUrl} alt={message.nickname} sx={avatarStyles} />}
      </Box>
    </Box>
  );
});

MessageItem.displayName = 'MessageItem';
