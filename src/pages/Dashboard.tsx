// src/pages/Dashboard.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useUserStore } from '../stores/userStore';
import { useCylinderStore } from '../stores/cylinderStore';
import { getLearningModules } from '../data/learningModules';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/common/StatCard';
import ModuleCard from '../components/dashboard/ModuleCard';
import { EmojiEvents, CheckCircle, TrendingUp, AutoAwesome } from '@mui/icons-material';

const Dashboard: React.FC = () => {
    const { profile, xp, level, badges, completedModules } = useUserStore();
    const { completedLessons } = useCylinderStore();
    const modules = getLearningModules(completedModules, completedLessons);

    const totalModules = modules.length;
    const completedCount = modules.filter(m => m.isCompleted).length;
    const overallProgress = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

    return (
        <PageContainer>
            <PageHeader title={`Selamat Datang, ${profile?.name || 'Siswa'}!`} subtitle="Platform pembelajaran interaktif untuk menguasai geometri bangun ruang." />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
                <StatCard title="Level Saat Ini" value={`Level ${level}`} subtitle={`${xp} Total XP`} icon={<EmojiEvents />} color="primary" />
                <StatCard title="Modul Selesai" value={`${completedCount}/${totalModules}`} subtitle="Modul pembelajaran" icon={<CheckCircle />} color="success" />
                <StatCard title="Progress Keseluruhan" value={`${Math.round(overallProgress)}%`} subtitle="Penyelesaian kursus" icon={<TrendingUp />} color="warning" />
                <StatCard title="Lencana Didapat" value={badges.length} subtitle="Prestasi dibuka" icon={<AutoAwesome />} color="secondary" />
            </Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>Modul Pembelajaran</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 4 }}>
                {modules.map((module) => (
                    <ModuleCard key={module.id} {...module} />
                ))}
            </Box>
        </PageContainer>
    );
};

export default Dashboard;
