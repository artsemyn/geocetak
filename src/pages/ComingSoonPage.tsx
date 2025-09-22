// src/pages/ComingSoonPage.tsx
import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';

const ComingSoonPage: React.FC<{module: string}> = ({module}) => {
     return (
        <PageContainer>
            <PageHeader title={`${module} - Segera Hadir`} subtitle="Modul ini sedang dalam pengembangan." />
            <Typography>Kami bekerja keras untuk memberikan Anda pengalaman belajar terbaik. Nantikan modul ini!</Typography>
        </PageContainer>
    );
}

export default ComingSoonPage;
