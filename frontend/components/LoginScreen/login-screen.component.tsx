import { MAX_NICKNAME_LENGTH } from '@/config/api.config';
import PeopleIcon from '@mui/icons-material/People';
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { LoginScreenProps } from './login-screen.props';

const rootBoxStyles = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  bgcolor: 'background.default',
};

const avatarStyles = {
  width: 72,
  height: 72,
  mx: 'auto',
  mb: 2,
  bgcolor: 'primary.main',
};

const paperStyles = {
  p: 4,
  borderRadius: 3,
};

const buttonStyles = {
  textTransform: 'none',
  fontWeight: 600,
  py: 1.2,
};

const textFieldStyles = {
  mb: 3,
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
  },
};

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
    <>
      <Box sx={rootBoxStyles}>
        <Container maxWidth="sm">
          <Paper elevation={10} sx={paperStyles}>
            <Box textAlign="center" mb={4}>
              <Avatar sx={avatarStyles}>
                <PeopleIcon sx={{ fontSize: 40 }} />
              </Avatar>

              <Typography variant="h5" fontWeight={600}>
                Welcome to the chat!
              </Typography>

              <Typography variant="body2" color="text.secondary" mt={1}>
                Enter your nickname to join the conversation
              </Typography>
            </Box>

            <TextField
              fullWidth
              placeholder="Your nickname"
              value={nickname}
              onChange={handleNicknameChange}
              onKeyUp={handleNicknameKeyUp}
              slotProps={{
                input: {
                  inputProps: { maxLength: MAX_NICKNAME_LENGTH },
                },
              }}
              sx={textFieldStyles}
            />

            <Button
              fullWidth
              size="large"
              variant="contained"
              disabled={!nickname.trim()}
              onClick={handleLoginClick}
              sx={buttonStyles}
            >
              Join Chat Room
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
};
