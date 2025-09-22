// src/pages/NotFoundPage.tsx
import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';

const NotFoundPage: React.FC = () => {
     return (
        <PageContainer>
            <PageHeader title="404 - Halaman Tidak Ditemukan" subtitle="Maaf, halaman yang Anda cari tidak ada." />
            <Button component={RouterLink} to="/" variant="contained">Kembali ke Dashboard</Button>
        </PageContainer>
    );
}

export default NotFoundPage;
