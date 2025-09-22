// src/components/common/StatCard.tsx
import React from 'react';
import { Paper, Box, Avatar, Typography } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'secondary';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, color }) => (
    <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.dark`, width: 56, height: 56, mr: 2 }}>
                {icon}
            </Avatar>
            <Box>
                <Typography variant="h4" fontWeight="bold">{value}</Typography>
                <Typography variant="body2" color="text.secondary">{title}</Typography>
            </Box>
        </Box>
        <Typography variant="caption" color="text.secondary">{subtitle}</Typography>
    </Paper>
);

export default StatCard;
