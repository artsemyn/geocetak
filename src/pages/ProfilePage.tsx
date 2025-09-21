// src/pages/ProfilePage.tsx

import React, { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  Stack,
  Chip,
  TextField,
  Button,
  Badge,
} from '@mui/material';
import {
  Person,
  EmojiEvents,
  Settings,
  Edit,
  Save,
  TrendingUp,
  AccessTime,
  CheckCircle,
  School,
} from '@mui/icons-material';
import { useUserStore, Badge as BadgeType } from '../stores/userStore';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';

const StatItem: React.FC<{ title: string, value: string | number, icon: React.ReactNode }> = ({ title, value, icon }) => (
    <Box sx={{ textAlign: 'center' }}>
        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', mx: 'auto', mb: 1 }}>{icon}</Avatar>
        <Typography variant="h6" fontWeight="bold">{value}</Typography>
        <Typography variant="body2" color="text.secondary">{title}</Typography>
    </Box>
);

const BadgeCard: React.FC<{ badge: BadgeType }> = ({ badge }) => (
  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', height: '100%' }}>
    <Typography variant="h3" sx={{ mb: 1 }}>{badge.icon}</Typography>
    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
      {badge.name}
    </Typography>
  </Paper>
);

const ProfilePage: React.FC = () => {
  const { profile, xp, level, badges, completedModules } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  
  if (!profile) return null;

  const [editForm, setEditForm] = useState({ name: profile.name });
  const handleSave = () => setIsEditing(false);
  const handleCancel = () => {
      setEditForm({ name: profile.name });
      setIsEditing(false);
  };
  
  const totalStudyTime = 145;
  const averageScore = 85;

  return (
    <PageContainer>
        <PageHeader title="Profil & Pengaturan" />

        {/* Bento Grid Layout */}
        <Grid container spacing={3}>
            {/* Main Profile Info */}
            <Grid item xs={12} lg={8}>
                <Paper sx={{ p: 3, height: '100%' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
                        <Typography variant="h6" fontWeight="bold">Informasi Profil</Typography>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={isEditing ? <Save /> : <Edit />}
                            onClick={isEditing ? handleSave : () => setIsEditing(true)}
                        >
                            {isEditing ? 'Simpan' : 'Edit'}
                        </Button>
                    </Stack>
                    <Stack spacing={3} alignItems="center">
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <Chip label={`Level ${level}`} color="primary" />
                            }
                        >
                            <Avatar sx={{ width: 100, height: 100, bgcolor: 'secondary.main', fontSize: '3rem' }}>
                                {profile.name.charAt(0).toUpperCase()}
                            </Avatar>
                        </Badge>
                        <TextField 
                            fullWidth 
                            label="Nama Lengkap" 
                            value={editForm.name}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            disabled={!isEditing}
                            variant="outlined" 
                        />
                         <TextField fullWidth label="Email" defaultValue={profile.email} disabled variant="outlined" />
                    </Stack>
                </Paper>
            </Grid>

            {/* Learning Statistics */}
            <Grid item xs={12} lg={4}>
                <Paper sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>Statistik Belajar</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={6}><StatItem title="Modul Selesai" value={completedModules.length} icon={<School />} /></Grid>
                        <Grid item xs={6}><StatItem title="Lencana" value={badges.length} icon={<EmojiEvents />} /></Grid>
                        <Grid item xs={6}><StatItem title="Waktu Belajar" value={`${Math.floor(totalStudyTime / 60)}j`} icon={<AccessTime />} /></Grid>
                        <Grid item xs={6}><StatItem title="Skor Rata-rata" value={`${averageScore}%`} icon={<CheckCircle />} /></Grid>
                    </Grid>
                </Paper>
            </Grid>

            {/* Badges */}
            <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Lencana Dimenangkan</Typography>
                    <Grid container spacing={2}>
                        {badges.length > 0 ? badges.map((badge) => (
                            <Grid item xs={6} sm={4} md={3} lg={2} key={badge.id}>
                                <BadgeCard badge={badge} />
                            </Grid>
                        )) : (
                            <Grid item xs={12}>
                                <Typography color="text.secondary">Anda belum memenangkan lencana apapun. Teruslah belajar!</Typography>
                            </Grid>
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </PageContainer>
  );
};

export default ProfilePage;