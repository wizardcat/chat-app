import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import { AppBar, Box, Chip, IconButton, Toolbar, Typography } from '@mui/material';
import { ChatHeaderProps } from './chat-header.props';

const peopleIconStyles = { mr: 2 };
const boxStyles = { flexGrow: 1 };
const chipStyles = { mr: 2, display: { xs: 'none', sm: 'flex' } };

export const ChatHeader = ({ nickname, onlineUsers, onLogout }: ChatHeaderProps) => (
  <AppBar position="static">
    <Toolbar>
      <PeopleIcon sx={peopleIconStyles} />
      <Box sx={boxStyles}>
        <Typography variant="h6">Public Chat Room</Typography>
        <Typography variant="caption">{onlineUsers} online</Typography>
      </Box>
      <Chip label={nickname} color="default" sx={chipStyles} />
      <IconButton color="inherit" onClick={onLogout} aria-label="logout">
        <LogoutIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);
