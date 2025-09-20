import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Slider,
  FormControlLabel,
  Switch,
  Tabs,
  Tab,
  Chip,
  Paper,
  Breadcrumbs,
  Link,
  Alert,
  Divider,
  Stack,
  IconButton,
  Tooltip,
  Badge,
  LinearProgress,
  Avatar,
} from '@mui/material';
import {
  ArrowBack,
  Home,
  School,
  PlayArrow,
  Pause,
  Refresh,
  Settings,
  Calculate,
  Visibility,
  VisibilityOff,
  TuneRounded,
  AssessmentRounded,
  MenuBookRounded,
  Quiz,
  EmojiEvents,
  Star,
  CheckCircle,
  Celebration,
  BookmarkBorder,
  Assignment,
  Lock,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ThreeDViewport from '../../3d/ThreeDViewport';
import { useCylinderStore } from '../../../stores/cylinderStore';
import CylinderQuiz from './CylinderQuiz';

// Enhanced Cylinder Component for 3D Display
const InteractiveCylinder: React.FC = () => {
  const { radius, height, showWireframe, showNet, isAnimating } = useCylinderStore();
  
  if (showNet) {
    return <CylinderNet radius={radius} height={height} />;
  }
  
  return (
    <group>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, 32]} />
        <meshStandardMaterial 
          color="#4A90E2" 
          wireframe={showWireframe}
          transparent={showWireframe}
          opacity={showWireframe ? 0.7 : 0.9}
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>
      
      {/* Enhanced Dimension indicators */}
      <group position={[radius + 0.8, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, height, 8]} />
          <meshBasicMaterial color="#ff4444" />
        </mesh>
      </group>
      
      <group position={[0, height / 2 + 0.6, 0]}>
        <mesh>
          <cylinderGeometry args={[0.03, 0.03, radius, 8]} />
          <meshBasicMaterial color="#44ff44" />
        </mesh>
      </group>
    </group>
  );
};

// Cylinder Net Component
const CylinderNet: React.FC<{ radius: number; height: number }> = ({ radius, height }) => {
  const circumference = 2 * Math.PI * radius;

  return (
    <group>
      {/* Bottom circle */}
      <mesh position={[-3, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 32]} />
        <meshStandardMaterial color="#FFD700" side={2} />
      </mesh>
      
      {/* Top circle */}
      <mesh position={[3, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 32]} />
        <meshStandardMaterial color="#FFD700" side={2} />
      </mesh>
      
      {/* Side rectangle (unfolded) */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[circumference, height]} />
        <meshStandardMaterial color="#4A90E2" side={2} />
      </mesh>
    </group>
  );
};

// Progress Summary Page - SEPARATE PAGE after completion
const ProgressSummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const { completedLessons } = useCylinderStore();
  
  const lessons = [
    { id: 'concept', title: '🎯 Konsep & Unsur', desc: 'Memahami unsur-unsur tabung', xp: 20 },
    { id: 'net', title: '🔄 Jaring-jaring', desc: 'Menguasai jaring-jaring tabung', xp: 25 },
    { id: 'formula', title: '🧮 Penemuan Rumus', desc: 'Menemukan rumus tabung', xp: 30 },
    { id: 'quiz', title: '📝 Quiz & Latihan', desc: 'Menyelesaikan semua quiz', xp: 35 },
  ];

  const completionRate = (completedLessons.length / 4) * 100;
  const earnedXP = lessons.filter(l => completedLessons.includes(l.id)).reduce((sum, l) => sum + l.xp, 0);
  const totalXP = lessons.reduce((sum, l) => sum + l.xp, 0);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4,
      display: 'flex',
      alignItems: 'center'
    }}>
      <Container maxWidth="lg">
        <Card sx={{ borderRadius: 4, boxShadow: 6, overflow: 'hidden' }}>
          {/* Header */}
          <Box sx={{ 
            background: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
            color: 'white',
            p: 4,
            textAlign: 'center'
          }}>
            <Celebration sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              🎉 Modul Tabung Selesai!
            </Typography>
            <Typography variant="h5">
              Selamat! Anda telah menguasai semua materi tabung
            </Typography>
          </Box>
          
          <CardContent sx={{ p: 4 }}>
            {/* BIG Progress Section */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                📊 Progress Pembelajaran
              </Typography>
              
              {/* Giant Progress Circle */}
              <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
                <Box sx={{ 
                  width: 200, 
                  height: 200, 
                  borderRadius: '50%',
                  background: `conic-gradient(#4CAF50 ${completionRate * 3.6}deg, #e0e0e0 0deg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Box sx={{ 
                    width: 150, 
                    height: 150, 
                    borderRadius: '50%',
                    bgcolor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}>
                    <Typography variant="h2" fontWeight="bold" color="primary">
                      {completionRate}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Selesai
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Stats Grid */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={3}>
                  <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.light' }}>
                    <Typography variant="h4" fontWeight="bold" color="primary.dark">
                      {completedLessons.length}
                    </Typography>
                    <Typography variant="body2" color="primary.dark">
                      Pelajaran Selesai
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'secondary.light' }}>
                    <Typography variant="h4" fontWeight="bold" color="secondary.dark">
                      {earnedXP}
                    </Typography>
                    <Typography variant="body2" color="secondary.dark">
                      XP Diperoleh
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'success.light' }}>
                    <Typography variant="h4" fontWeight="bold" color="success.dark">
                      ~45
                    </Typography>
                    <Typography variant="body2" color="success.dark">
                      Menit Belajar
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'warning.light' }}>
                    <Typography variant="h4" fontWeight="bold" color="warning.dark">
                      100%
                    </Typography>
                    <Typography variant="body2" color="warning.dark">
                      Tingkat Penguasaan
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>

            {/* Detailed Progress Breakdown */}
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
              📚 Breakdown Pembelajaran
            </Typography>
            
            {lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);
              return (
                <Paper 
                  key={lesson.id} 
                  sx={{ 
                    p: 3, 
                    mb: 2,
                    border: 2,
                    borderColor: isCompleted ? 'success.main' : 'grey.300',
                    bgcolor: isCompleted ? 'success.light' : 'grey.50',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      transition: 'transform 0.2s ease'
                    }
                  }}
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={1}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%',
                        bgcolor: isCompleted ? 'success.main' : 'grey.400',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        {isCompleted ? <CheckCircle /> : <Lock />}
                      </Box>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="h6" fontWeight="bold">
                        {lesson.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {lesson.desc}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Chip 
                        label={`${lesson.xp} XP`}
                        color={isCompleted ? "success" : "default"}
                        variant={isCompleted ? "filled" : "outlined"}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body2" fontWeight="bold" color={isCompleted ? 'success.main' : 'text.secondary'}>
                        {isCompleted ? '✅ Selesai' : '⏳ Belum'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })}

            {/* Achievement Summary */}
            <Box sx={{ mt: 4, p: 3, bgcolor: 'info.light', borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                🏆 Achievement yang Diraih
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <EmojiEvents sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Tabung Master
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Menguasai semua konsep tabung
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Star sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Formula Expert
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Memahami derivasi rumus tabung
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Calculate sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      3D Visualizer
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mahir manipulasi objek 3D
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Quiz sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Quiz Champion
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lulus semua evaluasi
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Next Steps */}
            <Box sx={{ mt: 4, p: 3, bgcolor: 'warning.light', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ mr: 1, color: 'warning.dark' }} />
                <Typography variant="h6" fontWeight="bold" color="warning.dark">
                  Langkah Selanjutnya
                </Typography>
              </Box>
              <Typography variant="body1" color="warning.dark" paragraph>
                Anda telah menguasai konsep tabung dengan sempurna! Saatnya melanjutkan perjalanan belajar ke materi berikutnya.
              </Typography>
              <Typography variant="body2" color="warning.dark">
                📍 <strong>Rekomendasi:</strong> Lanjut ke Modul Kerucut untuk mempelajari bangun ruang sisi lengkung berikutnya
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 4 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/')}
                startIcon={<Home />}
                sx={{ px: 4, py: 1.5 }}
              >
                Kembali ke Dashboard
              </Button>
              
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/module/cone')}
                endIcon={<ArrowBack sx={{ transform: 'rotate(180deg)' }} />}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF5252, #26C6DA)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                Lanjut ke Modul Kerucut
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

// TabPanel Component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

// Main Component
const CylinderLessonLayout: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [showProgressSummary, setShowProgressSummary] = useState(false);
  
  const {
    radius,
    height,
    showWireframe,
    showNet,
    isAnimating,
    volume,
    surfaceArea,
    completedLessons,
    setRadius,
    setHeight,
    toggleWireframe,
    toggleNet,
    setAnimating,
    calculateValues,
    completeLesson,
  } = useCylinderStore();

  useEffect(() => {
    calculateValues();
  }, [radius, height, calculateValues]);

  // Check if all lessons are completed - show progress summary page
  useEffect(() => {
    if (completedLessons.length === 4) {
      setTimeout(() => setShowProgressSummary(true), 1500);
    }
  }, [completedLessons]);

  // Show progress summary page if all lessons done
  if (showProgressSummary) {
    return <ProgressSummaryPage />;
  }

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    
    // Mark lessons as completed when accessed
    const lessons = ['concept', 'net', 'formula', 'quiz'];
    if (!completedLessons.includes(lessons[newValue])) {
      completeLesson(lessons[newValue]);
    }
  };

  const formatNumber = (num: number) => num.toFixed(2);

  const tabs = [
    { label: 'Konsep', icon: <MenuBookRounded />, color: 'primary' },
    { label: 'Jaring-jaring', icon: <Settings />, color: 'secondary' },
    { label: 'Rumus', icon: <Calculate />, color: 'success' },
    { label: 'Quiz', icon: <Quiz />, color: 'warning' },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 2
    }}>
      <Container maxWidth="xl">
        {/* Header Section - Clean */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 3 }}>
          <Breadcrumbs sx={{ mb: 2 }}>
            <Link 
              underline="hover" 
              color="inherit" 
              onClick={() => navigate('/')}
              sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              Dashboard
            </Link>
            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
              <School sx={{ mr: 0.5 }} fontSize="inherit" />
              Modul Tabung
            </Typography>
          </Breadcrumbs>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                🔵 Modul Tabung (Cylinder)
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Pelajari konsep tabung melalui visualisasi 3D interaktif dan penemuan rumus
              </Typography>
            </Box>
            
            <Button 
              startIcon={<ArrowBack />}
              onClick={() => navigate('/')}
              variant="outlined"
              size="large"
            >
              Dashboard
            </Button>
          </Box>
          
          {/* Simple Stats */}
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
            <Chip 
              label={`${completedLessons.length}/4 Pelajaran`} 
              color="primary" 
              variant="filled"
            />
            <Chip 
              label={`Volume: ${formatNumber(volume)} unit³`} 
              color="info" 
              variant="outlined"
            />
            <Chip 
              label={`LP: ${formatNumber(surfaceArea)} unit²`} 
              color="info" 
              variant="outlined"
            />
          </Stack>
        </Paper>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Left: 3D Viewport */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    🎮 Visualisasi 3D Interaktif
                  </Typography>
                  
                  <Stack direction="row" spacing={1}>
                    <Tooltip title={isAnimating ? "Pause Rotasi" : "Mulai Rotasi"}>
                      <IconButton
                        onClick={() => setAnimating(!isAnimating)}
                        color={isAnimating ? "secondary" : "primary"}
                        sx={{ 
                          border: 1, 
                          borderColor: 'divider',
                          '&:hover': { transform: 'scale(1.1)', boxShadow: 2 }
                        }}
                      >
                        {isAnimating ? <Pause /> : <PlayArrow />}
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Reset Parameter">
                      <IconButton
                        onClick={() => { setRadius(1); setHeight(2); }}
                        color="warning"
                        sx={{ 
                          border: 1, 
                          borderColor: 'divider',
                          '&:hover': { transform: 'scale(1.1)', boxShadow: 2 }
                        }}
                      >
                        <Refresh />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title={showWireframe ? "Mode Solid" : "Mode Wireframe"}>
                      <IconButton
                        onClick={toggleWireframe}
                        color={showWireframe ? "success" : "default"}
                        sx={{ 
                          border: 1, 
                          borderColor: 'divider',
                          '&:hover': { transform: 'scale(1.1)', boxShadow: 2 }
                        }}
                      >
                        {showWireframe ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
                
                <Box sx={{ 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  border: 2,
                  borderColor: 'primary.light'
                }}>
                  <ThreeDViewport height={500}>
                    <InteractiveCylinder />
                  </ThreeDViewport>
                </Box>
                
                <Box sx={{ 
                  mt: 2, 
                  p: 2, 
                  bgcolor: 'grey.50', 
                  borderRadius: 2,
                  border: 1,
                  borderColor: 'grey.200'
                }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Jari-jari:</strong> {formatNumber(radius)} unit
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Tinggi:</strong> {formatNumber(height)} unit
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Status:</strong> {isAnimating ? "🔄 Rotating" : "⏸️ Static"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right: Controls & Calculations ONLY - NO PROGRESS PANEL */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              {/* Parameter Controls */}
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <TuneRounded sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" fontWeight="bold">
                      Kontrol Parameter
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Jari-jari (r)
                      </Typography>
                      <Chip 
                        label={`${formatNumber(radius)} unit`} 
                        size="small" 
                        color="primary"
                        variant="filled"
                      />
                    </Box>
                    <Slider
                      value={radius}
                      onChange={(_, value) => setRadius(value as number)}
                      min={0.5}
                      max={3}
                      step={0.1}
                      valueLabelDisplay="auto"
                      color="primary"
                      sx={{ 
                        '& .MuiSlider-thumb': { 
                          width: 24, 
                          height: 24,
                          '&:hover': {
                            boxShadow: '0px 0px 0px 8px rgba(74, 144, 226, 0.16)'
                          }
                        }
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Tinggi (t)
                      </Typography>
                      <Chip 
                        label={`${formatNumber(height)} unit`} 
                        size="small" 
                        color="secondary"
                        variant="filled"
                      />
                    </Box>
                    <Slider
                      value={height}
                      onChange={(_, value) => setHeight(value as number)}
                      min={0.5}
                      max={4}
                      step={0.1}
                      valueLabelDisplay="auto"
                      color="secondary"
                      sx={{ 
                        '& .MuiSlider-thumb': { 
                          width: 24, 
                          height: 24,
                          '&:hover': {
                            boxShadow: '0px 0px 0px 8px rgba(80, 200, 120, 0.16)'
                          }
                        }
                      }}
                    />
                  </Box>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Opsi Tampilan
                    </Typography>
                    <Stack spacing={2}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={showWireframe}
                            onChange={toggleWireframe}
                            color="primary"
                          />
                        }
                        label="Mode Wireframe"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={showNet}
                            onChange={toggleNet}
                            color="secondary"
                          />
                        }
                        label="Tampilkan Jaring-jaring"
                      />
                    </Stack>
                  </Box>
                </CardContent>
              </Card>

              {/* Calculation Results */}
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <AssessmentRounded sx={{ mr: 1, color: 'success.main' }} />
                    <Typography variant="h6" fontWeight="bold">
                      Hasil Perhitungan
                    </Typography>
                  </Box>
                  
                  <Stack spacing={2}>
                    <Paper sx={{ 
                      p: 2, 
                      bgcolor: 'primary.light',
                      border: 1,
                      borderColor: 'primary.main'
                    }}>
                      <Typography variant="subtitle2" color="primary.dark" gutterBottom>
                        Volume
                      </Typography>
                      <Typography variant="h5" color="primary.dark" fontWeight="bold">
                        {formatNumber(volume)} unit³
                      </Typography>
                      <Typography variant="caption" color="primary.dark">
                        V = π × r² × t
                      </Typography>
                    </Paper>
                    
                    <Paper sx={{ 
                      p: 2, 
                      bgcolor: 'secondary.light',
                      border: 1,
                      borderColor: 'secondary.main'
                    }}>
                      <Typography variant="subtitle2" color="secondary.dark" gutterBottom>
                        Luas Permukaan
                      </Typography>
                      <Typography variant="h5" color="secondary.dark" fontWeight="bold">
                        {formatNumber(surfaceArea)} unit²
                      </Typography>
                      <Typography variant="caption" color="secondary.dark">
                        LP = 2πr(r + t)
                      </Typography>
                    </Paper>
                    
                    <Paper sx={{ 
                      p: 2, 
                      bgcolor: 'warning.light',
                      border: 1,
                      borderColor: 'warning.main'
                    }}>
                      <Typography variant="subtitle2" color="warning.dark" gutterBottom>
                        Luas Selimut
                      </Typography>
                      <Typography variant="h5" color="warning.dark" fontWeight="bold">
                        {formatNumber(2 * Math.PI * radius * height)} unit²
                      </Typography>
                      <Typography variant="caption" color="warning.dark">
                        LS = 2πrt
                      </Typography>
                    </Paper>
                  </Stack>
                </CardContent>
              </Card>

              {/* Quick Tips */}
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    💡 Tips Belajar
                  </Typography>
                  <Stack spacing={2}>
                    <Typography variant="body2" color="text.secondary">
                      🎯 Selesaikan semua tab untuk mendapatkan pemahaman lengkap
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      🎮 Gunakan slider untuk mengeksplorasi parameter tabung
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      🔄 Lihat jaring-jaring untuk memahami struktur tabung
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      📝 Kerjakan quiz untuk menguji pemahaman
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Bottom: Learning Content */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs 
                    value={tabValue} 
                    onChange={handleTabChange} 
                    variant="fullWidth"
                    sx={{
                      '& .MuiTab-root': {
                        minHeight: 72,
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }
                    }}
                  >
                    {tabs.map((tab, index) => (
                      <Tab 
                        key={index}
                        icon={
                          <Badge 
                            color="success" 
                            variant="dot" 
                            invisible={!completedLessons.includes(['concept', 'net', 'formula', 'quiz'][index])}
                          >
                            {tab.icon}
                          </Badge>
                        }
                        label={tab.label}
                        iconPosition="start"
                      />
                    ))}
                  </Tabs>
                </Box>

                <Box sx={{ p: 4 }}>
                  <TabPanel value={tabValue} index={0}>
                    <ConceptLesson />
                  </TabPanel>
                  
                  <TabPanel value={tabValue} index={1}>
                    <NetLesson />
                  </TabPanel>
                  
                  <TabPanel value={tabValue} index={2}>
                    <FormulaLesson />
                  </TabPanel>
                  
                  <TabPanel value={tabValue} index={3}>
                    <CylinderQuiz />
                  </TabPanel>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Lesson Components (same as before)
const ConceptLesson: React.FC = () => (
  <Box>
    <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
      🎯 Konsep dan Unsur-unsur Tabung
    </Typography>
    
    <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
      💡 Gunakan kontrol parameter di sebelah kanan untuk mengeksplorasi tabung secara interaktif!
    </Alert>
    
    <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
      Tabung adalah bangun ruang yang dibatasi oleh dua bidang lingkaran yang sejajar dan kongruen 
      serta sebuah bidang lengkung yang disebut selimut tabung.
    </Typography>
    
    <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 3, fontWeight: 'bold' }}>
      🔍 Unsur-unsur Tabung:
    </Typography>
    <Grid container spacing={3}>
      {[
        { title: "Alas dan Tutup", desc: "Dua lingkaran yang sejajar dan sama besar (kongruen)", icon: "🔵", color: "primary" },
        { title: "Selimut Tabung", desc: "Bidang lengkung yang menyelimuti dan menghubungkan alas dengan tutup", icon: "🔄", color: "secondary" },
        { title: "Jari-jari (r)", desc: "Jarak dari pusat lingkaran alas/tutup ke tepi lingkaran", icon: "📏", color: "success" },
        { title: "Tinggi (t)", desc: "Jarak tegak lurus antara bidang alas dan tutup tabung", icon: "📐", color: "warning" }
      ].map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Paper sx={{ 
            p: 3, 
            height: '100%',
            border: 2,
            borderColor: `${item.color}.light`,
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 6,
              transition: 'all 0.3s ease'
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" sx={{ mr: 2 }}>{item.icon}</Typography>
              <Typography variant="h6" fontWeight="bold" color={`${item.color}.main`}>
                {item.title}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              {item.desc}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const NetLesson: React.FC = () => {
  const { toggleNet, showNet } = useCylinderStore();
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="secondary">
        🔄 Jaring-jaring Tabung
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
        Jaring-jaring tabung adalah bentuk datar yang diperoleh dengan cara membuka 
        atau membelah tabung. Jaring-jaring tabung terdiri dari:
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { icon: "🟡", title: "2 Lingkaran", desc: "Alas dan tutup tabung", color: "warning" },
          { icon: "🟦", title: "1 Persegi Panjang", desc: "Selimut tabung", color: "primary" },
          { icon: "📏", title: "Ukuran Selimut", desc: "Panjang = 2πr, Lebar = t", color: "success" }
        ].map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper sx={{ 
              p: 3, 
              textAlign: 'center',
              border: 2,
              borderColor: `${item.color}.light`,
              height: '100%'
            }}>
              <Typography variant="h3" gutterBottom>{item.icon}</Typography>
              <Typography variant="h6" fontWeight="bold" color={`${item.color}.main`} gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2">{item.desc}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Button 
          variant="contained" 
          onClick={toggleNet}
          size="large"
          color={showNet ? "secondary" : "primary"}
          sx={{ 
            px: 6, 
            py: 2, 
            fontSize: '1.2rem',
            borderRadius: 3,
            boxShadow: 3,
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 6
            }
          }}
        >
          {showNet ? '📦 Tutup Jaring-jaring' : '🔄 Buka Jaring-jaring'}
        </Button>
      </Box>
      
      {showNet && (
        <Alert severity="success" sx={{ borderRadius: 2, fontSize: '1.1rem' }}>
          ✨ Lihat animasi jaring-jaring tabung di viewport 3D di sebelah kiri!
        </Alert>
      )}
    </Box>
  );
};

const FormulaLesson: React.FC = () => {
  const { radius, height, volume, surfaceArea } = useCylinderStore();
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="success.main">
        🧮 Penemuan Rumus Tabung
      </Typography>
      
      <Alert severity="info" sx={{ mb: 4, borderRadius: 2, fontSize: '1.1rem' }}>
        🔍 Ikuti langkah-langkah berikut untuk memahami bagaimana rumus tabung diturunkan!
      </Alert>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 4, 
            border: 2,
            borderColor: 'primary.light',
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-2px)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
              1️⃣ Volume Tabung
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" paragraph>
                Volume tabung = Luas alas × Tinggi
              </Typography>
              <Typography variant="body1" paragraph>
                Luas alas = π × r² = π × {radius}² = {(Math.PI * radius * radius).toFixed(2)}
              </Typography>
              <Typography variant="body1" paragraph>
                Volume = {(Math.PI * radius * radius).toFixed(2)} × {height} = <strong>{volume.toFixed(2)} unit³</strong>
              </Typography>
            </Box>
            <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 3, borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold">
                V = π × r² × t
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 4, 
            border: 2,
            borderColor: 'secondary.light',
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-2px)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Typography variant="h5" gutterBottom color="secondary" fontWeight="bold">
              2️⃣ Luas Permukaan Tabung
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" paragraph>
                Luas Permukaan = 2 × Luas alas + Luas selimut
              </Typography>
              <Typography variant="body1" paragraph>
                = 2πr² + 2πrt = 2πr(r + t)
              </Typography>
              <Typography variant="body1" paragraph>
                = 2π × {radius} × ({radius} + {height}) = <strong>{surfaceArea.toFixed(2)} unit²</strong>
              </Typography>
            </Box>
            <Box sx={{ bgcolor: 'secondary.main', color: 'white', p: 3, borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold">
                LP = 2πr(r + t)
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Paper sx={{ 
        p: 4, 
        mt: 4, 
        bgcolor: 'success.light',
        border: 2,
        borderColor: 'success.main'
      }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          📋 Ringkasan Rumus Tabung
        </Typography>
        <Grid container spacing={3}>
          {[
            { title: "Volume", formula: "V = πr²t", color: "primary" },
            { title: "Luas Permukaan", formula: "LP = 2πr(r+t)", color: "secondary" },
            { title: "Luas Selimut", formula: "LS = 2πrt", color: "warning" },
            { title: "Luas Alas", formula: "LA = πr²", color: "info" }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" fontWeight="bold" color={`${item.color}.main`}>
                  {item.title}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {item.formula}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default CylinderLessonLayout;