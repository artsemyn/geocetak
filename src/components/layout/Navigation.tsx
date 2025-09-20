import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Chip,
} from '@mui/material';
import { School } from '@mui/icons-material';

const Navigation: React.FC = () => {
  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <School sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          GeoCetak
        </Typography>
        <Chip label="150 XP" color="secondary" size="small" />
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;