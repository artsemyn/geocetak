// src/pages/ProfilePage.tsx
import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';

const ProfilePage: React.FC = () => {
    return (
        <PageContainer>
            <PageHeader title="Profil Pengguna" subtitle="Lihat dan atur informasi profil Anda." />
            <Typography>Halaman profil akan segera tersedia.</Typography>
        </PageContainer>
    );
}

export default ProfilePage;
