import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import Dashboard from './components/layout/DashboardLayout';
import CylinderLessonLayout from './components/modules/cylinder/CylinderLessonLayout';
import EssayPractice from './components/practice/EssayPractice';
import Analytics from './components/Analytics';
import Profile from './components/Profile';

// Create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
    },
    secondary: {
      main: '#FF4081',
      light: '#FF79B0',
      dark: '#C60055',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavigationBar />
          <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
            <Routes>
              {/* Main pages */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/learning" element={<LearningHub />} />
              <Route path="/practice" element={<EssayPractice />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* Module-specific routes */}
              <Route path="/module/cylinder" element={<CylinderLessonLayout />} />
              {/* Future: cone, sphere modules */}
              <Route path="/module/cone" element={<ComingSoon module="Kerucut" />} />
              <Route path="/module/sphere" element={<ComingSoon module="Bola" />} />
              
              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

// Placeholder components
const LearningHub: React.FC = () => (
  <div>Learning Hub - List of all modules</div>
);

const Analytics: React.FC = () => (
  <div>Analytics Dashboard</div>
);

const Profile: React.FC = () => (
  <div>User Profile</div>
);

const ComingSoon: React.FC<{ module: string }> = ({ module }) => (
  <div>Coming Soon: {module} Module</div>
);

const NotFound: React.FC = () => (
  <div>404 - Page Not Found</div>
);

export default App;