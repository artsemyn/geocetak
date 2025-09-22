// src/components/dashboard/ModuleCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Box, CardContent, CardActions, Typography, Stack, Chip, Button } from '@mui/material';
import { AccessTime, Star, CheckCircle, PlayArrow, Lock } from '@mui/icons-material';
import type { Module } from '../../types';

const ModuleCard: React.FC<Module> = (module) => {
    const navigate = useNavigate();
    const handleStart = () => module.isAvailable && navigate(`/module/${module.id}`);
    
    return (
        <Card onClick={handleStart} sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: module.isAvailable ? 'pointer' : 'default', opacity: module.isAvailable ? 1 : 0.6, transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 } }}>
            <Box sx={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${module.isCompleted ? '#4CAF50, #81C784' : module.isAvailable ? '#667eea, #764ba2' : '#BDBDBD, #9E9E9E'})`, color: 'white' }}>
                <Typography variant="h1">{module.icon}</Typography>
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" fontWeight="bold">{module.title}</Typography>
                <Typography variant="body2" color="text.secondary">{module.description}</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Chip label={module.estimatedTime} icon={<AccessTime />} size="small" />
                    <Chip label={`${module.xpReward} XP`} icon={<Star />} size="small" color="primary" />
                </Stack>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
                <Button size="small" fullWidth variant="contained" disabled={!module.isAvailable} startIcon={module.isCompleted ? <CheckCircle /> : module.isAvailable ? <PlayArrow /> : <Lock />}>
                    {module.isCompleted ? 'Ulas' : module.isAvailable ? 'Mulai' : 'Terkunci'}
                </Button>
            </CardActions>
        </Card>
    );
};

export default ModuleCard;
