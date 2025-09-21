// src/components/NavigationBar.tsx

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Chip,
  Badge,
  Tooltip,
  Container,
} from '@mui/material';
import {
  Home,
  School,
  Assignment,
  Analytics,
  AccountCircle,
  Notifications,
  ExitToApp,
  EmojiEvents,
  MenuBook,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, xp, level, badges } = useUserStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    // Tambahkan logika logout di sini jika ada
  };

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { label: 'Dashboard', path: '/', icon: <Home fontSize="small" /> },
    { label: 'Pembelajaran', path: '/learning', icon: <MenuBook fontSize="small" /> },
    { label: 'Latihan Soal', path: '/practice', icon: <Assignment fontSize="small" /> },
    { label: 'Analitik', path: '/analytics', icon: <Analytics fontSize="small" /> },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo & Brand */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
            >
              <School sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.02em'
              }}
            >
              GeoCetak
            </Typography>
          </Box>

          {/* Navigation Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  color: isActive(item.path) ? 'primary.main' : 'text.secondary',
                  bgcolor: isActive(item.path) ? 'primary.light' : 'transparent',
                  fontWeight: isActive(item.path) ? 700 : 500,
                  px: 2.5,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* User Info & Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={`${xp.toLocaleString()} XP`}
              color="primary"
              variant="outlined"
              size="small"
              icon={<EmojiEvents sx={{ fontSize: 16 }} />}
              sx={{ fontWeight: 600 }}
            />
            <Tooltip title="Notifikasi" arrow>
              <IconButton sx={{ color: 'text.secondary' }}>
                <Badge badgeContent={2} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Profile Menu */}
            <Tooltip title="Profile" arrow>
              <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
                <Avatar
                  src={profile?.avatar}
                  sx={{
                    width: 40,
                    height: 40,
                    border: 2,
                    borderColor: 'primary.light'
                  }}
                >
                  {profile?.name?.[0] || 'U'}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>

          {/* Profile Menu Dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ sx: { borderRadius: 3, mt: 1.5, minWidth: 220 } }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {profile?.name || 'User'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Level {level}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }} sx={{ py: 1.5, px: 2 }}>
              <AccountCircle sx={{ mr: 2 }} /> Profile
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ py: 1.5, px: 2, color: 'error.main' }}>
              <ExitToApp sx={{ mr: 2 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;