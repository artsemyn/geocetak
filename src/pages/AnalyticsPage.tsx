// src/pages/AnalyticsPage.tsx
import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';

const AnalyticsPage: React.FC = () => {
    return (
        <PageContainer>
            <PageHeader title="Analitik Pembelajaran" subtitle="Lacak progres dan pencapaian Anda." />
            <Typography>Halaman analitik akan segera tersedia.</Typography>
        </PageContainer>
    );
}

export default AnalyticsPage;
