import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';
import Layout from './components/layout/Layout';
import DashboardLayout from './components/layout/DashboardLayout';
import CylinderLessonLayout from './components/modules/cylinder/CylinderLessonLayout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardLayout />} />
            <Route path="module/cylinder" element={<CylinderLessonLayout />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;