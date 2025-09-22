// src/styles/theme.ts
import { createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#667eea', light: '#e0e7ff', dark: '#5a67d8' },
    secondary: { main: '#764ba2', light: '#f3e5f5', dark: '#6a1b9a' },
    success: { main: '#38a169', light: '#c6f6d5' },
    warning: { main: '#dd6b20', light: '#feebc8' },
    error: { main: '#e53e3e', light: '#fed7d7' },
    background: { default: '#f7fafc', paper: '#ffffff' },
    text: { primary: '#2d3748', secondary: '#718096' },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Roboto", "Arial", sans-serif',
    h3: { fontWeight: 800 }, h4: { fontWeight: 700 }, h5: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 700 } } },
    MuiCard: { styleOverrides: { root: { boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' } } },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
