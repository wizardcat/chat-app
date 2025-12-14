import SendIcon from '@mui/icons-material/Send';
import { Box, Container, IconButton, Paper, TextField } from '@mui/material';
import { MessageInputProps } from './message-input.props';

export const MessageInput = ({ value, onChange, onSend, disabled }: MessageInputProps) => {
  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Container maxWidth="lg">
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            placeholder="Type a message..."
            variant="outlined"
            size="small"
            value={value}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            disabled={disabled}
          />
          <IconButton
            color="primary"
            onClick={onSend}
            disabled={!value.trim() || disabled}
            aria-label="send message"
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Container>
    </Paper>
  );
};
