import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Stack,
} from '@mui/material';
import { PlayArrow, CheckCircle, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  isLocked: boolean;
  isCompleted: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
    id,
    title,
    description,
    progress,
    isLocked,
    isCompleted,
  }) => {
    const navigate = useNavigate();
  
    const handleStart = () => {
      if (!isLocked) {
        navigate(`/module/${id}`);
      }
    };
  
    return (
      <Card
        sx={{
          height: '100%',
          opacity: isLocked ? 0.6 : 1,
          cursor: isLocked ? 'not-allowed' : 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: isLocked ? 'none' : 'translateY(-4px)',
            boxShadow: isLocked ? 'none' : 3,
          },
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" component="h2">
              {title}
            </Typography>
            {isCompleted && <CheckCircle color="success" />}
            {isLocked && <Lock color="disabled" />}
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Progress</Typography>
              <Typography variant="body2">{progress}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
          
          <Button
            variant={isCompleted ? 'outlined' : 'contained'}
            fullWidth
            startIcon={isLocked ? <Lock /> : <PlayArrow />}
            disabled={isLocked}
            onClick={handleStart}
          >
            {isLocked ? 'Locked' : isCompleted ? 'Review' : 'Start Learning'}
          </Button>
        </CardContent>
      </Card>
    );
  };

const DashboardLayout: React.FC = () => {
  const { profile, xp, badges } = useUserStore();

  const modules = [
    {
      id: 'cylinder',
      title: 'Tabung (Cylinder)',
      description: 'Pelajari tentang bangun ruang tabung, cara menghitung volume dan luas permukaan.',
      progress: 0,
      isLocked: false,
      isCompleted: false,
    },
    {
      id: 'cone',
      title: 'Kerucut (Cone)',
      description: 'Eksplorasi bangun ruang kerucut dan aplikasinya dalam kehidupan sehari-hari.',
      progress: 0,
      isLocked: true,
      isCompleted: false,
    },
    {
      id: 'sphere',
      title: 'Bola (Sphere)',
      description: 'Memahami konsep bola dan penggunaannya dalam berbagai bidang.',
      progress: 0,
      isLocked: true,
      isCompleted: false,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Selamat Datang, {profile?.full_name}!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Mari lanjutkan perjalanan belajar geometri 3D Anda
        </Typography>
        
        {/* Stats */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Chip label={`${xp} XP`} color="primary" />
          <Chip label={`${badges.length} Badges`} color="secondary" />
          <Chip label="Level 1" variant="outlined" />
        </Stack>
      </Box>

      {/* Learning Modules */}
      <Typography variant="h5" component="h2" gutterBottom>
        Modul Pembelajaran
      </Typography>
      
      <Grid container spacing={3}>
        {modules.map((module) => (
          <Grid item xs={12} md={4} key={module.id}>
            <ModuleCard {...module} />
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Aktivitas Terbaru
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Belum ada aktivitas pembelajaran. Mulai dengan modul Tabung!
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default DashboardLayout;