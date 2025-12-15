import { createTheme } from '@mui/material/styles';

export const chatTheme = createTheme({
  palette: {
    mode: 'light',
    divider: '#e9edef',

    primary: {
      main: '#075E54',
      contrastText: '#ffffff',
      light: '#25D366',
    },

    secondary: {
      main: '#00A884',
      contrastText: '#ffffff',
    },

    background: {
      default: '#ECE5DD',
      paper: '#F0F2F5',
    },

    text: {
      primary: '#111B21',
      secondary: '#667781',
      disabled: '#4A4A4A',
    },

    success: {
      light: '#DCF8C6',
      main: '#25D366',
    },

    common: {
      white: '#FFFFFF',
    },
  },

  shape: {
    borderRadius: 6,
  },

  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    body1: {
      fontSize: '0.95rem',
    },
    body2: {
      fontSize: '0.85rem',
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

