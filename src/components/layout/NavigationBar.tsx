// src/components/layout/NavigationBar.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import {
    AppBar, Toolbar, Typography, Box, Button, Chip, Tooltip, IconButton, Avatar, Menu, MenuItem, Divider, Container
} from '@mui/material';
import { Home, MenuBook, Assignment, Analytics, School, EmojiEvents } from '@mui/icons-material';

const NavigationBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { profile, xp, level } = useUserStore();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { label: 'Dashboard', path: '/', icon: <Home /> },
        { label: 'Pembelajaran', path: '/learning', icon: <MenuBook /> },
        { label: 'Latihan Soal', path: '/practice', icon: <Assignment /> },
        { label: 'Analitik', path: '/analytics', icon: <Analytics /> },
    ];

    return (
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', color: 'text.primary', borderBottom: 1, borderColor: 'divider' }}>
            <Container maxWidth="xl">
                <Toolbar>
                    <School sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>GeoCetak</Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        {navItems.map((item) => (
                            <Button key={item.path} onClick={() => navigate(item.path)} startIcon={item.icon} sx={{ color: isActive(item.path) ? 'primary.main' : 'text.secondary', fontWeight: isActive(item.path) ? 'bold' : 'normal' }}>
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Chip label={`${xp} XP`} color="primary" variant="outlined" icon={<EmojiEvents />} sx={{ mr: 2 }} />
                    <Tooltip title="Profile">
                        <IconButton onClick={handleMenu} color="inherit">
                            <Avatar>{profile?.name?.[0]}</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <Box sx={{ px: 2, py: 1 }}><Typography fontWeight="bold">{profile?.name}</Typography><Typography variant="body2">Level {level}</Typography></Box>
                        <Divider />
                        <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavigationBar;
