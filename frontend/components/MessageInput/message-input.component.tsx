import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import { MessageInputProps } from './message-input.props';

export const MessageInput = ({ value, onChange, onSend, disabled }: MessageInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(e.target.value);
    };

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'sticky',
        bottom: 0,
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.default',
        px: 2,
        py: 1.5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 1,
          bgcolor: 'common.white',
          borderRadius: 6,
          pl: 2,
          pr: 1,
          py: 1,
        }}
      >
        <InputBase
          fullWidth
          multiline
          maxRows={6}
          placeholder="Type a message"
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          sx={{
            fontSize: 15,
            lineHeight: '20px',
            color: 'text.primary',
            '& textarea': {
              resize: 'none',
            },
            '&::placeholder': {
              color: 'text.secondary',
            },
          }}
        />

        <IconButton
          size="small"
          onClick={onSend}
          disabled={!value.trim() || disabled}
          sx={{
            // border: 1,
            // borderColor: 'divider',
            // color: 'primary.main',
            color: 'background.paper',
            bgcolor: 'primary.main',
            '&:disabled': {
              color: 'text.disabled',
              bgcolor: 'divider',
            },
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <SendIcon sx={{ pl: 0.2 }} fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
};
