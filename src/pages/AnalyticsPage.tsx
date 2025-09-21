// src/pages/AnalyticsPage.tsx

import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  Card,
  CardContent,
  LinearProgress,
  Stack,
} from '@mui/material';
import {
  TrendingUp,
  Assessment,
  Timeline,
  BarChart,
  EmojiEvents,
  School,
  AccessTime,
  CheckCircle,
} from '@mui/icons-material';
import { useUserStore } from '../stores/userStore';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'secondary';
}> = ({ title, value, icon, color }) => (
  <Paper sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', gap: 2 }}>
    <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.dark`, width: 56, height: 56 }}>
      {icon}
    </Avatar>
    <Box>
      <Typography variant="h4" fontWeight="bold">
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </Box>
  </Paper>
);

const AnalyticsPage: React.FC = () => {
  const { xp, level, badges, completedModules } = useUserStore();

  const totalModules = 3;
  const studyTime = 145;
  const averageScore = 85;

  return (
    <PageContainer>
        <PageHeader
            title="Dasbor Analitik"
            subtitle="Lacak progres dan pencapaian Anda secara mendetail."
        />

        {/* Bento Grid Layout */}
        <Grid container spacing={3}>
            {/* Row 1: Main Stats */}
            <Grid item xs={12} sm={6} lg={3}>
                <StatCard title="Total XP" value={xp.toLocaleString()} icon={<EmojiEvents />} color="primary" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <StatCard title="Level Saat Ini" value={level} icon={<School />} color="success" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <StatCard title="Waktu Belajar" value={`${Math.floor(studyTime / 60)}j ${studyTime % 60}m`} icon={<AccessTime />} color="warning" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <StatCard title="Lencana Didapat" value={badges.length} icon={<CheckCircle />} color="secondary" />
            </Grid>
            
            {/* Row 2: Progress Chart and Performance */}
            <Grid item xs={12} lg={8}>
                <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>Progres Belajar per Waktu</Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: 2, minHeight: 250 }}>
                        <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                            <BarChart sx={{ fontSize: 48, mb: 1 }} />
                            <Typography>Grafik akan ditampilkan di sini</Typography>
                        </Box>
                    </Box>
                </Paper>
            </Grid>

            <Grid item xs={12} lg={4}>
                 <Paper sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Ringkasan Performa</Typography>
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="body1" color="text.secondary" gutterBottom>Rata-rata Skor Kuis</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <LinearProgress variant="determinate" value={averageScore} sx={{ flexGrow: 1, height: 8, borderRadius: 4 }} color="success" />
                                <Typography variant="h6" color="success.main" fontWeight="bold">{averageScore}%</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary" gutterBottom>Tingkat Penyelesaian Modul</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <LinearProgress variant="determinate" value={(completedModules.length / totalModules) * 100} sx={{ flexGrow: 1, height: 8, borderRadius: 4 }} color="primary" />
                                <Typography variant="h6" color="primary.main" fontWeight="bold">{Math.round((completedModules.length / totalModules) * 100)}%</Typography>
                            </Box>
                        </Box>
                         <Box>
                            <Typography variant="body1" color="text.secondary" gutterBottom>Runtutan Belajar</Typography>
                            <Typography variant="h4" color="warning.main" fontWeight="bold">7 hari</Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Grid>
        </Grid>
    </PageContainer>
  );
};

export default AnalyticsPage;