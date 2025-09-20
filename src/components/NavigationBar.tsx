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
  Settings,
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
    // Implement logout logic
    handleProfileMenuClose();
  };

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { label: 'Dashboard', path: '/', icon: <Home /> },
    { label: 'Pembelajaran', path: '/learning', icon: <School /> },
    { label: 'Latihan Soal', path: '/practice', icon: <Assignment /> },
    { label: 'Progress', path: '/analytics', icon: <Analytics /> },
  ];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: 'white', 
        color: 'text.primary',
        boxShadow: 1,
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo & Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mr: 4
            }}
          >
            📐 GeoCetak
          </Typography>
        </Box>

        {/* Navigation Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              startIcon={item.icon}
              onClick={() => navigate(item.path)}
              sx={{
                color: isActive(item.path) ? 'primary.main' : 'text.secondary',
                bgcolor: isActive(item.path) ? 'primary.light' : 'transparent',
                fontWeight: isActive(item.path) ? 'bold' : 'normal',
                px: 2,
                py: 1,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'primary.light',
                  color: 'primary.main'
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* User Info & Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* XP & Level Display */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={`Level ${level}`}
              color="primary"
              size="small"
              icon={<EmojiEvents />}
            />
            <Typography variant="body2" color="text.secondary">
              {xp} XP
            </Typography>
          </Box>

          {/* Notifications */}
          <Tooltip title="Notifikasi">
            <IconButton
              onClick={handleNotificationOpen}
              sx={{ color: 'text.secondary' }}
            >
              <Badge badgeContent={2} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Profile Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" fontWeight="medium">
                {profile?.name || 'User'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {badges.length} badges earned
              </Typography>
            </Box>
            
            <IconButton onClick={handleProfileMenuOpen}>
              <Avatar
                src={profile?.avatar}
                sx={{ width: 40, height: 40 }}
              >
                {profile?.name?.[0] || 'U'}
              </Avatar>
            </IconButton>
          </Box>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>
            <AccountCircle sx={{ mr: 2 }} />
            Profile
          </MenuItem>
          <MenuItem onClick={() => { navigate('/settings'); handleProfileMenuClose(); }}>
            <Settings sx={{ mr: 2 }} />
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ExitToApp sx={{ mr: 2 }} />
            Logout
          </MenuItem>
        </Menu>

        {/* Notification Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleNotificationClose}>
            <Box>
              <Typography variant="body2" fontWeight="medium">
                Quiz baru tersedia!
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2 menit yang lalu
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleNotificationClose}>
            <Box>
              <Typography variant="body2" fontWeight="medium">
                Badge baru: Formula Expert
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1 jam yang lalu
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;