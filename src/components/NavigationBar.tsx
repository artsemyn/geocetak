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
  Settings,
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
  };

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { label: 'Dashboard', path: '/', icon: <Home fontSize="small" /> },
    { label: 'Pembelajaran', path: '/learning', icon: <MenuBook fontSize="small" /> },
    { label: 'Latihan Soal', path: '/practice', icon: <Assignment fontSize="small" /> },
  ];

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
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
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.25)'
              }}
            >
              <School sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Box>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em'
                }}
              >
                GeoCetak
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: -0.5 }}>
                3D Learning Platform
              </Typography>
            </Box>
          </Box>

          {/* Navigation Menu - Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
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
                  minWidth: 'auto',
                  position: 'relative',
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                    transform: 'translateY(-1px)',
                  },
                  '&:after': isActive(item.path) ? {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 24,
                    height: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: 2,
                  } : {},
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* User Info & Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* XP & Level Display */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1.5 }}>
              <Chip
                label={`Level ${level}`}
                color="primary"
                size="small"
                icon={<EmojiEvents sx={{ fontSize: 16 }} />}
                sx={{ 
                  fontWeight: 600,
                  '& .MuiChip-icon': { ml: 1 }
                }}
              />
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" fontWeight={600} color="primary">
                  {xp} XP
                </Typography>
              </Box>
            </Box>

            {/* Notifications */}
            <Tooltip title="Notifikasi" arrow>
              <IconButton
                onClick={handleNotificationOpen}
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <Badge badgeContent={2} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Profile Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
                <Typography variant="body2" fontWeight={600}>
                  {profile?.name || 'User'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {badges.length} badges
                </Typography>
              </Box>
              
              <Tooltip title="Profile Menu" arrow>
                <IconButton 
                  onClick={handleProfileMenuOpen}
                  sx={{
                    p: 0,
                    '&:hover': {
                      transform: 'scale(1.05)'
                    },
                    transition: 'transform 0.2s ease'
                  }}
                >
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
            PaperProps={{
              sx: {
                borderRadius: 3,
                mt: 1,
                minWidth: 200,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }
            }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="body2" fontWeight={600}>
                {profile?.name || 'User'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {profile?.email || 'user@geocetak.com'}
              </Typography>
            </Box>
            
            <MenuItem 
              onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}
              sx={{ py: 1.5 }}
            >
              <AccountCircle sx={{ mr: 2 }} />
              Profile
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            <MenuItem 
              onClick={handleLogout}
              sx={{ py: 1.5, color: 'error.main' }}
            >
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
            PaperProps={{
              sx: {
                borderRadius: 3,
                mt: 1,
                minWidth: 320,
                maxWidth: 400,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }
            }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Notifikasi
              </Typography>
            </Box>
            
            <MenuItem onClick={handleNotificationClose} sx={{ py: 2 }}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'success.main',
                      mr: 1
                    }}
                  />
                  <Typography variant="body2" fontWeight={600}>
                    Quiz baru tersedia!
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Modul Kerucut - 2 menit yang lalu
                </Typography>
              </Box>
            </MenuItem>
            
            <MenuItem onClick={handleNotificationClose} sx={{ py: 2 }}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'warning.main',
                      mr: 1
                    }}
                  />
                  <Typography variant="body2" fontWeight={600}>
                    Badge baru: Formula Expert
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Selamat! - 1 jam yang lalu
                </Typography>
              </Box>
            </MenuItem>
            
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
              <Button size="small" onClick={handleNotificationClose}>
                Lihat Semua Notifikasi
              </Button>
            </Box>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;