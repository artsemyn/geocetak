import React from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';
import {
  School,
  Assignment,
  PlayArrow,
  CheckCircle,
  AccessTime,
  Star,
  Construction,
  Lightbulb,
  Timeline,
  Code,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ComingSoonPageProps {
  module: string;
  description?: string;
  expectedFeatures?: string[];
  estimatedTime?: string;
  difficulty?: string;
  prerequisites?: string[];
}

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed';
}> = ({ icon, title, description, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      default:
        return 'grey';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Ready';
      case 'in-progress':
        return 'In Development';
      default:
        return 'Planned';
    }
  };

  return (
    <Card sx={{ height: '100%', border: '1px solid', borderColor: 'grey.200' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: `${getStatusColor()}.main`, mr: 2 }}>
            {icon}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              {title}
            </Typography>
            <Chip
              label={getStatusText()}
              size="small"
              color={getStatusColor() as any}
              sx={{ mt: 0.5 }}
            />
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({
  module,
  description,
  expectedFeatures = [],
  estimatedTime = "45-60 menit",
  difficulty = "Menengah",
  prerequisites = [],
}) => {
  const navigate = useNavigate();

  const defaultFeatures = [
    "Visualisasi 3D interaktif",
    "Penemuan rumus berbasis aktivitas",
    "Quiz adaptif dengan AI feedback",
    "Simulasi real-world applications"
  ];

  const features = expectedFeatures.length > 0 ? expectedFeatures : defaultFeatures;

  const developmentProgress = [
    {
      icon: <Lightbulb />,
      title: "Conceptual Design",
      description: "Merancang pengalaman pembelajaran yang optimal",
      status: 'completed' as const,
    },
    {
      icon: <Code />,
      title: "3D Visualization",
      description: "Mengembangkan visualisasi interaktif dengan Three.js",
      status: 'in-progress' as const,
    },
    {
      icon: <School />,
      title: "Content Creation",
      description: "Menyusun materi pembelajaran dan latihan soal",
      status: 'in-progress' as const,
    },
    {
      icon: <Assignment />,
      title: "Assessment System",
      description: "Implementasi sistem evaluasi AI-powered",
      status: 'planned' as const,
    },
  ];

  const overallProgress = 35; // Mock progress percentage

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: 'calc(100vh - 80px)' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box sx={{
          textAlign: 'center',
          py: 6,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 4,
          color: 'white',
          mb: 6,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%)',
            backgroundSize: '30px 30px',
          }
        }}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            >
              <Construction sx={{ fontSize: 60 }} />
            </Box>

            <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
              {module} Module
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, maxWidth: 600, mx: 'auto' }}>
              {description || `Modul ${module} sedang dalam tahap pengembangan dengan fitur-fitur canggih untuk pembelajaran interaktif`}
            </Typography>

            {/* Module Info */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 4 }}>
              <Chip
                label={difficulty}
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }}
              />
              <Chip
                label={estimatedTime}
                icon={<AccessTime sx={{ color: 'white !important' }} />}
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }}
              />
              <Chip
                label="120+ XP"
                icon={<Star sx={{ color: 'white !important' }} />}
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                onClick={() => navigate('/module/cylinder')}
                size="large"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.9)',
                  color: 'primary.main',
                  fontWeight: 600,
                  px: 4,
                  '&:hover': {
                    bgcolor: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Mulai Modul Tabung
              </Button>
              <Button
                variant="outlined"
                startIcon={<Assignment />}
                onClick={() => navigate('/')}
                size="large"
                sx={{
                  borderColor: 'rgba(255,255,255,0.7)',
                  color: 'white',
                  fontWeight: 600,
                  px: 4,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                Kembali ke Dashboard
              </Button>
            </Stack>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Development Progress */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 4, mb: 4, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <Timeline />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    Development Progress
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Track the development of this learning module
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Overall Progress
                  </Typography>
                  <Typography variant="h6" color="primary.main" fontWeight="bold">
                    {overallProgress}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={overallProgress}
                  sx={{
                    height: 12,
                    borderRadius: 6,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 6,
                      background: 'linear-gradient(90deg, #667eea, #764ba2)',
                    }
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Estimated completion: Q2 2024
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {developmentProgress.map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <FeatureCard {...item} />
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Expected Features */}
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Fitur yang Akan Hadir
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Modul ini akan dilengkapi dengan berbagai fitur pembelajaran interaktif:
              </Typography>

              <List>
                {features.map((feature, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Side Info */}
          <Grid item xs={12} lg={4}>
            {/* Module Info */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Informasi Modul
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Tingkat Kesulitan
                </Typography>
                <Chip label={difficulty} color="primary" />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Estimasi Waktu
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTime sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body1">{estimatedTime}</Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  XP Reward
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Star sx={{ mr: 1, color: 'warning.main' }} />
                  <Typography variant="body1">120+ XP</Typography>
                </Box>
              </Box>

              {prerequisites.length > 0 && (
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Prasyarat
                  </Typography>
                  <Stack spacing={1}>
                    {prerequisites.map((prereq, index) => (
                      <Chip key={index} label={prereq} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </Box>
              )}
            </Paper>

            {/* Suggestion */}
            <Paper sx={{
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
              border: '1px solid',
              borderColor: 'primary.light',
            }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Sementara Waktu...
              </Typography>
              <Typography variant="body2" paragraph>
                Sambil menunggu modul ini selesai, Anda bisa:
              </Typography>

              <List dense>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <PlayArrow sx={{ color: 'primary.main', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Eksplorasi Modul Tabung"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Assignment sx={{ color: 'primary.main', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Latihan Soal Essay AI"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircle sx={{ color: 'primary.main', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Review Progress Anda"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ComingSoonPage;