// src/components/learning/ModuleDetailCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Avatar, Typography, Stack, Chip, LinearProgress, Button } from '@mui/material';
import { AccessTime, Star, CheckCircle, PlayArrow, Lock } from '@mui/icons-material';
import type { Module } from '../../types';

const ModuleDetailCard: React.FC<{ module: Module }> = ({ module }) => {
    const navigate = useNavigate();
    const completedSubLessons = module.subLessons.filter(sub => sub.isCompleted).length;
    const totalSubLessons = module.subLessons.length;
    const detailProgress = totalSubLessons > 0 ? (completedSubLessons / totalSubLessons) * 100 : 0;
    
    return (
        <Card sx={{ mb: 3, opacity: module.isAvailable ? 1 : 0.7 }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 3 }}>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Avatar sx={{ width: 64, height: 64, fontSize: '2.5rem', mr: 3, bgcolor: module.isAvailable ? 'primary.main' : 'grey.400', color: 'white' }}>{module.icon}</Avatar>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h5" fontWeight="bold">{module.title}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{module.description}</Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                <Chip label={module.difficulty} color="secondary" size="small"/>
                                <Chip label={module.estimatedTime} icon={<AccessTime />} size="small" variant="outlined"/>
                                <Chip label={`${module.xpReward} XP`} icon={<Star />} color="primary" size="small"/>
                            </Stack>
                        </Box>
                    </Box>
                    <Box sx={{ minWidth: { xs: '100%', md: 300 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary" fontWeight={600}>Progres: {completedSubLessons}/{totalSubLessons}</Typography>
                                <Typography variant="body2" color="primary.main" fontWeight={600}>{Math.round(detailProgress)}%</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={detailProgress} sx={{ height: 8, borderRadius: 4 }}/>
                        </Box>
                        <Button variant={module.isCompleted ? "outlined" : "contained"} startIcon={module.isCompleted ? <CheckCircle /> : module.isAvailable ? <PlayArrow /> : <Lock />} onClick={() => module.isAvailable && navigate(`/module/${module.id}`)} disabled={!module.isAvailable} fullWidth size="large">
                            {module.isCompleted ? 'Ulas Kembali' : module.isAvailable ? 'Mulai Belajar' : 'Terkunci'}
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ModuleDetailCard;
