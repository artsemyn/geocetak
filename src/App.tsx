// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './styles/theme';

// Layout
import NavigationBar from './components/layout/NavigationBar';

// Pages
import Dashboard from './pages/Dashboard';
import LearningPage from './pages/LearningPage';
import EssayPracticePage from './pages/EssayPracticePage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProfilePage from './pages/ProfilePage';
import CylinderLessonLayout from './pages/CylinderLessonLayout';
import ComingSoonPage from './pages/ComingSoonPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavigationBar />
          <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/learning" element={<LearningPage />} />
              <Route path="/practice" element={<EssayPracticePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/module/cylinder" element={<CylinderLessonLayout />} />
              <Route path="/module/cone" element={<ComingSoonPage module="Kerucut" />} />
              <Route path="/module/sphere" element={<ComingSoonPage module="Bola" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
