// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';

// Components
import NavigationBar from './components/NavigationBar';

// Pages
import Dashboard from './pages/Dashboard';
import LearningPage from './pages/LearningPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProfilePage from './pages/ProfilePage';
import ComingSoonPage from './pages/ComingSoonPage';
import NotFoundPage from './pages/NotFoundPage';
import CylinderLessonLayout from './components/modules/cylinder/CylinderLessonLayout';
import EssayPractice from './components/practice/EssayPractice';

// Create a more refined theme
let theme = createTheme({
  palette: {
    mode: 'light', // 'light' or 'dark'
    primary: {
      main: '#667eea',
      light: '#e0e7ff',
      dark: '#5a67d8',
    },
    secondary: {
      main: '#764ba2',
      light: '#f3e5f5',
      dark: '#6a1b9a',
    },
    success: {
      main: '#38a169',
      light: '#c6f6d5',
    },
    warning: {
      main: '#dd6b20',
      light: '#feebc8',
    },
    error: {
      main: '#e53e3e',
      light: '#fed7d7',
    },
    background: {
      default: '#f7fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#2d3748',
      secondary: '#718096',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.025em' },
    h2: { fontWeight: 700, letterSpacing: '-0.025em' },
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontWeight: 600, letterSpacing: '-0.01em' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.6 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          color: '#fff',
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavigationBar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              width: '100%',
              overflow: 'hidden'
            }}
          >
            <Routes>
              {/* Main pages */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/learning" element={<LearningPage />} />
              <Route path="/practice" element={<EssayPractice />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              {/* Module-specific routes */}
              <Route path="/module/cylinder" element={<CylinderLessonLayout />} />
              <Route path="/module/cone" element={<ComingSoonPage module="Kerucut" />} />
              <Route path="/module/sphere" element={<ComingSoonPage module="Bola" />} />

              {/* Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;