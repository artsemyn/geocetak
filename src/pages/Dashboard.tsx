import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';
import {
  School,
  PlayArrow,
  Lock,
  CheckCircle,
  TrendingUp,
  Assignment,
  EmojiEvents,
  Star,
  AccessTime,
  AutoAwesome,
  Insights,
  BookmarkBorder,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  isAvailable: boolean;
  isCompleted: boolean;
  progress: number;
  estimatedTime: string;
  xpReward: number;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  id,
  title,
  description,
  icon,
  isAvailable,
  isCompleted,
  progress,
  estimatedTime,
  xpReward,
}) => {
  const navigate = useNavigate();

  const handleStartModule = () => {
    if (isAvailable) {
      navigate(`/module/${id}`);
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        opacity: isAvailable ? 1 : 0.7,
        cursor: isAvailable ? 'pointer' : 'default',
        border: '1px solid',
        borderColor: isCompleted ? 'success.light' : isAvailable ? 'primary.light' : 'grey.300',
        '&:hover': {
          transform: isAvailable ? 'translateY(-8px)' : 'none',
          boxShadow: isAvailable ? '0 12px 24px rgba(0,0,0,0.15)' : 1,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderColor: isAvailable ? 'primary.main' : 'grey.300',
        }
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          height: 160,
          background: `linear-gradient(135deg, ${
            isCompleted ? '#4CAF50, #66BB6A' : isAvailable ? '#2196F3, #42A5F5' : '#9E9E9E, #BDBDBD'
          })`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            backgroundSize: '20px 20px',
          }
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '4rem', zIndex: 1 }}>
          {icon}
        </Typography>
        
        {/* Status Badge */}
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          {isCompleted && (
            <Box
              sx={{
                bgcolor: 'rgba(255,255,255,0.9)',
                borderRadius: '50%',
                p: 1,
                display: 'flex'
              }}
            >
              <CheckCircle sx={{ color: 'success.main', fontSize: 24 }} />
            </Box>
          )}
          {!isAvailable && (
            <Box
              sx={{
                bgcolor: 'rgba(255,255,255,0.9)',
                borderRadius: '50%',
                p: 1,
                display: 'flex'
              }}
            >
              <Lock sx={{ color: 'grey.600', fontSize: 24 }} />
            </Box>
          )}
        </Box>

        {/* Progress Badge */}
        {isAvailable && progress > 0 && (
          <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
            <Chip
              label={`${Math.round(progress)}%`}
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.9)',
                fontWeight: 600
              }}
            />
          </Box>
        )}
      </Box>
      
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h6" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3, lineHeight: 1.6 }}>
          {description}
        </Typography>
        
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip 
            label={estimatedTime} 
            size="small" 
            icon={<AccessTime sx={{ fontSize: 16 }} />}
            variant="outlined"
            sx={{ 
              borderColor: 'primary.light',
              '& .MuiChip-icon': { color: 'primary.main' }
            }}
          />
          <Chip 
            label={`${xpReward} XP`} 
            size="small" 
            color="primary"
            icon={<Star sx={{ fontSize: 16 }} />}
            sx={{ fontWeight: 600 }}
          />
        </Stack>
        
        {isAvailable && progress > 0 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Progress
              </Typography>
              <Typography variant="caption" color="primary" fontWeight={600}>
                {Math.round(progress)}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progress}
              sx={{ 
                height: 6, 
                borderRadius: 3,
                bgcolor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                }
              }}
            />
          </Box>
        )}
      </CardContent>
      
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button
          variant={isCompleted ? "outlined" : "contained"}
          startIcon={isCompleted ? <CheckCircle /> : isAvailable ? <PlayArrow /> : <Lock />}
          onClick={handleStartModule}
          disabled={!isAvailable}
          fullWidth
          size="large"
          sx={{
            py: 1.5,
            fontWeight: 600,
            borderRadius: 2,
            ...(isCompleted && {
              borderColor: 'success.main',
              color: 'success.main',
              '&:hover': {
                borderColor: 'success.dark',
                bgcolor: 'success.light'
              }
            })
          }}
        >
          {isCompleted ? 'Review Modul' : isAvailable ? 'Mulai Belajar' : 'Terkunci'}
        </Button>
      </CardActions>
    </Card>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'secondary';
}> = ({ title, value, subtitle, icon, color }) => (
  <Paper 
    sx={{ 
      p: 3,
      height: '100%',
      background: `linear-gradient(135deg, ${
        color === 'primary' ? '#E3F2FD, #BBDEFB' :
        color === 'success' ? '#E8F5E8, #C8E6C9' :
        color === 'warning' ? '#FFF3E0, #FFE0B2' :
        '#FCE4EC, #F8BBD9'
      })`,
      border: '1px solid',
      borderColor: `${color}.light`,
      '&:hover': { 
        transform: 'translateY(-4px)', 
        boxShadow: 4,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
      <Avatar 
        sx={{ 
          bgcolor: `${color}.main`, 
          width: 56, 
          height: 56,
          boxShadow: 2
        }}
      >
        {icon}
      </Avatar>
      <Box sx={{ ml: 2, flexGrow: 1 }}>
        <Typography variant="h4" fontWeight="bold" color={`${color}.dark`}>
          {value}
        </Typography>
        <Typography variant="body2" color={`${color}.dark`} fontWeight={600}>
          {title}
        </Typography>
      </Box>
    </Box>
    <Typography variant="caption" color="text.secondary">
      {subtitle}
    </Typography>
  </Paper>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { profile, xp, level, badges, completedModules } = useUserStore();

  const modules: ModuleCardProps[] = [
    {
      id: 'cylinder',
      title: 'Tabung (Cylinder)',
      description: 'Pelajari konsep tabung melalui visualisasi 3D interaktif dan penemuan rumus volume serta luas permukaan',
      icon: '🔵',
      isAvailable: true,
      isCompleted: completedModules.includes('cylinder'),
      progress: completedModules.includes('cylinder') ? 100 : 65,
      estimatedTime: '45 menit',
      xpReward: 110
    },
    {
      id: 'cone',
      title: 'Kerucut (Cone)',
      description: 'Eksplorasi mendalam tentang kerucut dan aplikasinya dalam kehidupan sehari-hari',
      icon: '🔺',
      isAvailable: completedModules.includes('cylinder'),
      isCompleted: completedModules.includes('cone'),
      progress: 0,
      estimatedTime: '50 menit',
      xpReward: 120
    },
    {
      id: 'sphere',
      title: 'Bola (Sphere)',
      description: 'Memahami geometri bola dan hubungannya dengan bangun ruang lainnya',
      icon: '⚪',
      isAvailable: completedModules.includes('cone'),
      isCompleted: completedModules.includes('sphere'),
      progress: 0,
      estimatedTime: '55 menit',
      xpReward: 130
    }
  ];

  const totalModules = modules.length;
  const completedCount = modules.filter(m => m.isCompleted).length;
  const overallProgress = (completedCount / totalModules) * 100;

  const quickActions = [
    {
      label: 'Mulai Pembelajaran',
      icon: <School />,
      path: '/module/cylinder',
      variant: 'contained' as const,
      color: 'primary' as const
    },
    {
      label: 'Latihan Soal Essay',
      icon: <Assignment />,
      path: '/practice',
      variant: 'outlined' as const,
      color: 'primary' as const
    }
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Selamat Datang di GeoCetak!"
        subtitle="Platform pembelajaran interaktif untuk menguasai geometri bangun ruang dengan visualisasi 3D"
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ maxWidth: 600, mt: 3 }}>
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              color={action.color}
              startIcon={action.icon}
              onClick={() => navigate(action.path)}
              size="large"
              sx={{
                px: 3,
                py: 1.5,
                fontWeight: 600,
                flex: 1,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                },
                transition: 'all 0.2s ease'
              }}
            >
              {action.label}
            </Button>
          ))}
        </Stack>
      </PageHeader>

        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid xs={12} sm={6} md={3}>
            <StatCard
              title="Current Level"
              value={`Level ${level}`}
              subtitle={`${xp} Total XP Earned`}
              icon={<EmojiEvents sx={{ fontSize: 28 }} />}
              color="primary"
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <StatCard
              title="Modules Completed"
              value={`${completedCount}/${totalModules}`}
              subtitle="Learning modules finished"
              icon={<CheckCircle sx={{ fontSize: 28 }} />}
              color="success"
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <StatCard
              title="Overall Progress"
              value={`${Math.round(overallProgress)}%`}
              subtitle="Course completion rate"
              icon={<TrendingUp sx={{ fontSize: 28 }} />}
              color="warning"
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <StatCard
              title="Badges Earned"
              value={badges.length}
              subtitle="Achievements unlocked"
              icon={<AutoAwesome sx={{ fontSize: 28 }} />}
              color="secondary"
            />
          </Grid>
        </Grid>

        {/* Learning Modules */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <BookmarkBorder sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h4" fontWeight="bold">
              Modul Pembelajaran
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Ikuti urutan modul untuk pemahaman yang optimal. Setiap modul dilengkapi dengan visualisasi 3D interaktif, 
            latihan soal, dan evaluasi AI.
          </Typography>
          
          <Grid container spacing={4}>
            {modules.map((module) => (
              <Grid xs={12} md={6} lg={4} key={module.id}>
                <ModuleCard {...module} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Progress Summary */}
        {overallProgress > 0 && (
          <Paper 
            sx={{ 
              p: 4, 
              background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
              border: '1px solid',
              borderColor: 'primary.light',
              borderRadius: 3
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <Insights />
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                Ringkasan Progress Anda
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary" fontWeight={600}>
                    Overall Progress
                  </Typography>
                  <Typography variant="body2" color="primary.main" fontWeight={700}>
                    {Math.round(overallProgress)}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={overallProgress} 
                  sx={{ 
                    height: 12, 
                    borderRadius: 6,
                    bgcolor: 'rgba(255,255,255,0.7)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 6,
                      background: 'linear-gradient(90deg, #2196F3, #21CBF3)'
                    }
                  }}
                />
              </Box>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Anda telah menyelesaikan <strong>{completedCount}</strong> dari <strong>{totalModules}</strong> modul pembelajaran.
              {completedCount < totalModules && (
                <>
                  {" "}Lanjutkan ke modul{" "}
                  <strong>{modules.find(m => !m.isCompleted && m.isAvailable)?.title}</strong>
                  {" "}berikutnya untuk melanjutkan perjalanan belajar Anda!
                </>
              )}
              {completedCount === totalModules && (
                " Selamat! Anda telah menyelesaikan semua modul pembelajaran. Lanjutkan dengan latihan soal untuk mengasah kemampuan!"
              )}
            </Typography>
            
            {completedCount < totalModules && (
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  onClick={() => {
                    const nextModule = modules.find(m => !m.isCompleted && m.isAvailable);
                    if (nextModule) navigate(`/module/${nextModule.id}`);
                  }}
                  sx={{ fontWeight: 600 }}
                >
                  Lanjutkan Pembelajaran
                </Button>
              </Box>
            )}
          </Paper>
        )}
    </PageContainer>
  );
};

export default Dashboard;