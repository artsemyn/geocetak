// src/pages/LearningPage.tsx
import React from 'react';
import { Box } from '@mui/material';
import { useUserStore } from '../stores/userStore';
import { useCylinderStore } from '../stores/cylinderStore';
import { getLearningModules } from '../data/learningModules';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import ModuleDetailCard from '../components/learning/ModuleDetailCard';

const LearningPage: React.FC = () => {
    const { completedModules } = useUserStore();
    const { completedLessons } = useCylinderStore();
    const modules = getLearningModules(completedModules, completedLessons);
    return (
        <PageContainer>
            <PageHeader title="Jelajahi Modul Pembelajaran" subtitle="Pilih modul untuk memulai petualangan geometri 3D Anda." />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {modules.map((module) => (
                    <ModuleDetailCard key={module.id} module={module} />
                ))}
            </Box>
        </PageContainer>
    );
};

export default LearningPage;
