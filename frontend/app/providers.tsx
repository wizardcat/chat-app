'use client';

import { chatTheme } from '@/theme/chat-theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={chatTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
