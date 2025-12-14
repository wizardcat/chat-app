import { MAX_NICKNAME_LENGTH } from '@/config/api.config';
import PeopleIcon from '@mui/icons-material/People';
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { LoginScreenProps } from './login-screen.props';

const rootBoxStyles = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
};

const avatarStyles = {
  width: 80,
  height: 80,
  mx: 'auto',
  mb: 2,
  bgcolor: 'primary.main',
};

const paperStyles = { p: 4, borderRadius: 4 };

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [nickname, setNickname] = useState('');

  const handleNicknameKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onLogin(nickname);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleLoginClick = () => {
    onLogin(nickname);
  };

  return (
    <Box sx={rootBoxStyles}>
      <Container maxWidth="sm">
        <Paper elevation={10} sx={paperStyles}>
          <Box textAlign="center" mb={4}>
            <Avatar sx={avatarStyles}>
              <PeopleIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome to ChatRoom
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enter your nickname to join the conversation
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Nickname"
            variant="outlined"
            value={nickname}
            onChange={handleNicknameChange}
            onKeyUp={handleNicknameKeyUp}
            slotProps={{
              input: { inputProps: { maxLength: MAX_NICKNAME_LENGTH } },
            }}
            sx={{ mb: 3 }}
            autoFocus
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLoginClick}
            disabled={!nickname}
          >
            Join Chat Room
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};
