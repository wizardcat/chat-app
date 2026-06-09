import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import { AppBar, Box, Chip, IconButton, Toolbar, Typography } from '@mui/material';

export interface ChatHeaderProps {
  nickname: string;
  onlineUsers: number;
  onLogout: () => void;
}

const appBarStyles = {
  backgroundColor: 'background.paper',
  borderBottom: 1,
  borderColor: 'divider',
};

const peopleIconStyles = { mr: 2, color: 'primary.main' };
const boxStyles = { flexGrow: 1 };
const chipStyles = {
  mr: 2,
  display: { xs: 'none', sm: 'flex' },
};

export const ChatHeader = ({ nickname, onlineUsers, onLogout }: ChatHeaderProps) => (
  <AppBar position="static" color="default" elevation={1} sx={appBarStyles}>
    <Toolbar>
      <PeopleIcon sx={peopleIconStyles} />

      <Box sx={boxStyles}>
        <Typography variant="subtitle1" fontWeight={600}>
          Public Chat Room
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {onlineUsers} online
        </Typography>
      </Box>

      <Chip label={nickname} size="small" variant="outlined" sx={chipStyles} />

      <IconButton edge="end" onClick={onLogout} aria-label="logout" color="inherit">
        <LogoutIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);
