import React, { useState } from 'react';
import {
  Container,
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  School,
  PlayArrow,
  Lock,
  CheckCircle,
  Star,
  AccessTime,
  ExpandMore,
  Circle,
  PlayCircle,
  Assignment,
  Quiz,
  ThreeDRotation,
  Calculate,
  BookmarkBorder,
  TrendingUp,
  EmojiEvents,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { useCylinderStore } from '../stores/cylinderStore';

interface SubLesson {
  id: string;
  title: string;
  type: 'concept' | 'interactive' | 'formula' | 'quiz' | 'project';
  duration: number; // in minutes
  isCompleted: boolean;
  description: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  isAvailable: boolean;
  isCompleted: boolean;
  progress: number;
  estimatedTime: string;
  xpReward: number;
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
  prerequisites: string[];
  learningObjectives: string[];
  subLessons: SubLesson[];
}

const getTypeIcon = (type: SubLesson['type']) => {
  switch (type) {
    case 'concept': return <BookmarkBorder />;
    case 'interactive': return <ThreeDRotation />;
    case 'formula': return <Calculate />;
    case 'quiz': return <Quiz />;
    case 'project': return <Assignment />;
    default: return <Circle />;
  }
};

const getTypeColor = (type: SubLesson['type']) => {
  switch (type) {
    case 'concept': return 'primary';
    case 'interactive': return 'secondary';
    case 'formula': return 'success';
    case 'quiz': return 'warning';
    case 'project': return 'error';
    default: return 'default';
  }
};

const ModuleDetailCard: React.FC<{ module: Module }> = ({ module }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  
  const completedSubLessons = module.subLessons.filter(sub => sub.isCompleted).length;
  const totalSubLessons = module.subLessons.length;
  const detailProgress = totalSubLessons > 0 ? (completedSubLessons / totalSubLessons) * 100 : 0;

  return (
    <Card 
      sx={{ 
        mb: 3,
        border: '1px solid',
        borderColor: module.isCompleted ? 'success.light' : module.isAvailable ? 'primary.light' : 'grey.300',
        opacity: module.isAvailable ? 1 : 0.7,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          height: 120,
          background: `linear-gradient(135deg, ${
            module.isCompleted ? '#4CAF50, #66BB6A' : module.isAvailable ? '#667eea, #764ba2' : '#9E9E9E, #BDBDBD'
          })`,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          p: 3,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '4rem', color: 'white', mr: 3 }}>
          {module.icon}
        </Typography>
        
        <Box sx={{ color: 'white', flexGrow: 1 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {module.title}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            {module.description}
          </Typography>
        </Box>

        {module.isCompleted && (
          <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <CheckCircle sx={{ color: 'white', fontSize: 32 }} />
          </Box>
        )}
        {!module.isAvailable && (
          <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <Lock sx={{ color: 'white', fontSize: 32 }} />
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: 3 }}>
        {/* Stats & Info */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid xs={12} md={4}>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Chip 
                label={module.difficulty} 
                color="secondary" 
                size="small"
              />
              <Chip 
                label={module.estimatedTime} 
                icon={<AccessTime sx={{ fontSize: 16 }} />}
                size="small"
                variant="outlined"
              />
              <Chip 
                label={`${module.xpReward} XP`} 
                icon={<Star sx={{ fontSize: 16 }} />}
                color="primary" 
                size="small"
              />
            </Stack>
          </Grid>

          <Grid xs={12} md={8}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary" fontWeight={600}>
                  Progress: {completedSubLessons}/{totalSubLessons} pelajaran
                </Typography>
                <Typography variant="body2" color="primary" fontWeight={600}>
                  {Math.round(detailProgress)}%
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={detailProgress}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Learning Objectives */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Tujuan Pembelajaran
          </Typography>
          <List dense>
            {module.learningObjectives.map((objective, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <Circle sx={{ fontSize: 8, color: 'primary.main' }} />
                </ListItemIcon>
                <ListItemText 
                  primary={objective}
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Prerequisites */}
        {module.prerequisites.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Prasyarat
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {module.prerequisites.map((prereq, index) => (
                <Chip key={index} label={prereq} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        )}

        {/* Detailed Curriculum */}
        <Accordion 
          expanded={expanded} 
          onChange={() => setExpanded(!expanded)}
          sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6" fontWeight="bold">
              Rincian Materi ({totalSubLessons} Sub-Pelajaran)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {module.subLessons.map((subLesson, index) => (
                <React.Fragment key={subLesson.id}>
                  <ListItem
                    sx={{
                      border: '1px solid',
                      borderColor: subLesson.isCompleted ? 'success.light' : 'grey.200',
                      borderRadius: 2,
                      mb: 1,
                      bgcolor: subLesson.isCompleted ? 'success.light' : 'background.paper'
                    }}
                  >
                    <ListItemIcon>
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32,
                          bgcolor: subLesson.isCompleted ? 'success.main' : `${getTypeColor(subLesson.type)}.main`
                        }}
                      >
                        {subLesson.isCompleted ? (
                          <CheckCircle sx={{ fontSize: 20 }} />
                        ) : (
                          React.cloneElement(getTypeIcon(subLesson.type), { sx: { fontSize: 20 } })
                        )}
                      </Avatar>
                    </ListItemIcon>
                    
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body1" fontWeight={600}>
                            {index + 1}. {subLesson.title}
                          </Typography>
                          <Chip 
                            label={`${subLesson.duration} min`}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={subLesson.description}
                    />
                    
                    <Tooltip title={subLesson.isCompleted ? "Completed" : "Start Lesson"}>
                      <IconButton 
                        color={subLesson.isCompleted ? "success" : "primary"}
                        disabled={!module.isAvailable}
                      >
                        {subLesson.isCompleted ? <CheckCircle /> : <PlayCircle />}
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                  {index < module.subLessons.length - 1 && <Divider sx={{ my: 0.5 }} />}
                </React.Fragment>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button
          variant={module.isCompleted ? "outlined" : "contained"}
          startIcon={module.isCompleted ? <CheckCircle /> : module.isAvailable ? <PlayArrow /> : <Lock />}
          onClick={() => module.isAvailable && navigate(`/module/${module.id}`)}
          disabled={!module.isAvailable}
          fullWidth
          size="large"
          sx={{ fontWeight: 600, py: 1.5 }}
        >
          {module.isCompleted ? 'Review Modul' : module.isAvailable ? 'Mulai Pembelajaran' : 'Terkunci'}
        </Button>
      </CardActions>
    </Card>
  );
};

const LearningPage: React.FC = () => {
  const { completedModules } = useUserStore();
  const { completedLessons } = useCylinderStore();

  // Sample curriculum data
  const modules: Module[] = [
    {
      id: 'cylinder',
      title: 'Tabung (Cylinder)',
      description: 'Pelajari konsep tabung melalui visualisasi 3D interaktif dan penemuan rumus',
      icon: '🔵',
      isAvailable: true,
      isCompleted: completedModules.includes('cylinder'),
      progress: 65,
      estimatedTime: '45 menit',
      xpReward: 110,
      difficulty: 'Pemula',
      prerequisites: [],
      learningObjectives: [
        'Memahami unsur-unsur tabung (alas, tutup, selimut)',
        'Menurunkan rumus volume tabung dari konsep dasar',
        'Menghitung luas permukaan tabung',
        'Mengaplikasikan konsep tabung dalam kehidupan sehari-hari',
        'Memvisualisasikan jaring-jaring tabung'
      ],
      subLessons: [
        {
          id: 'concept',
          title: 'Konsep & Unsur-Unsur',
          type: 'concept',
          duration: 10,
          isCompleted: completedLessons.includes('concept'),
          description: 'Pengenalan unsur-unsur tabung dan karakteristiknya'
        },
        {
          id: 'net',
          title: 'Jaring-Jaring Interaktif',
          type: 'interactive',
          duration: 8,
          isCompleted: completedLessons.includes('net'),
          description: 'Eksplorasi jaring-jaring tabung melalui animasi 3D'
        },
        {
          id: 'formula',
          title: 'Penemuan Rumus',
          type: 'formula',
          duration: 15,
          isCompleted: completedLessons.includes('formula'),
          description: 'Menurunkan rumus volume dan luas permukaan secara interaktif'
        },
        {
          id: 'quiz',
          title: 'Quiz & Latihan',
          type: 'quiz',
          duration: 12,
          isCompleted: completedLessons.includes('quiz'),
          description: 'Evaluasi pemahaman melalui kuis interaktif'
        }
      ]
    },
    {
      id: 'cone',
      title: 'Kerucut (Cone)',
      description: 'Eksplorasi mendalam tentang kerucut dan aplikasinya',
      icon: '🔺',
      isAvailable: completedModules.includes('cylinder'),
      isCompleted: completedModules.includes('cone'),
      progress: 0,
      estimatedTime: '50 menit',
      xpReward: 120,
      difficulty: 'Menengah',
      prerequisites: ['Modul Tabung'],
      learningObjectives: [
        'Memahami unsur-unsur kerucut (alas, selimut, tinggi)',
        'Menurunkan rumus volume dan luas permukaan kerucut',
        'Memahami hubungan kerucut dengan tabung',
        'Mengaplikasikan konsep kerucut dalam arsitektur dan teknologi'
      ],
      subLessons: [
        {
          id: 'cone-concept',
          title: 'Konsep & Unsur Kerucut',
          type: 'concept',
          duration: 12,
          isCompleted: false,
          description: 'Pengenalan karakteristik dan unsur-unsur kerucut'
        },
        {
          id: 'cone-formula',
          title: 'Rumus Volume & Luas',
          type: 'formula',
          duration: 18,
          isCompleted: false,
          description: 'Derivasi rumus kerucut dan hubungannya dengan tabung'
        },
        {
          id: 'cone-applications',
          title: 'Aplikasi Praktis',
          type: 'interactive',
          duration: 15,
          isCompleted: false,
          description: 'Penerapan kerucut dalam kehidupan sehari-hari'
        },
        {
          id: 'cone-quiz',
          title: 'Evaluasi Kerucut',
          type: 'quiz',
          duration: 5,
          isCompleted: false,
          description: 'Tes pemahaman konsep kerucut'
        }
      ]
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
      xpReward: 130,
      difficulty: 'Lanjutan',
      prerequisites: ['Modul Tabung', 'Modul Kerucut'],
      learningObjectives: [
        'Memahami karakteristik unik bola sebagai bangun ruang',
        'Menurunkan rumus volume dan luas permukaan bola',
        'Memahami hubungan bola dengan tabung dan kerucut',
        'Mengeksplorasi aplikasi bola dalam sains dan teknologi'
      ],
      subLessons: [
        {
          id: 'sphere-concept',
          title: 'Konsep Bola',
          type: 'concept',
          duration: 15,
          isCompleted: false,
          description: 'Karakteristik dan sifat-sifat bola'
        },
        {
          id: 'sphere-formula',
          title: 'Rumus Bola',
          type: 'formula',
          duration: 20,
          isCompleted: false,
          description: 'Derivasi rumus volume dan luas permukaan bola'
        },
        {
          id: 'sphere-relations',
          title: 'Hubungan Antar Bangun',
          type: 'interactive',
          duration: 15,
          isCompleted: false,
          description: 'Keterkaitan bola dengan tabung dan kerucut'
        },
        {
          id: 'sphere-project',
          title: 'Proyek Akhir',
          type: 'project',
          duration: 5,
          isCompleted: false,
          description: 'Sintesis semua konsep bangun ruang'
        }
      ]
    }
  ];

  const totalModules = modules.length;
  const availableModules = modules.filter(m => m.isAvailable).length;
  const completedCount = modules.filter(m => m.isCompleted).length;
  const overallProgress = (completedCount / totalModules) * 100;

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: 'calc(100vh - 80px)' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Pembelajaran Geometri 3D
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Kuasai bangun ruang sisi lengkung melalui pendekatan interaktif dan visualisasi 3D
          </Typography>
        </Box>

        {/* Progress Summary */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid xs={12} md={8}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Progress Pembelajaran Anda
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={overallProgress}
                    sx={{ height: 12, borderRadius: 6 }}
                  />
                </Box>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {Math.round(overallProgress)}%
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {completedCount} dari {totalModules} modul selesai • {availableModules} modul tersedia
              </Typography>
            </Grid>
            <Grid xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <School />
                </Avatar>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <EmojiEvents />
                </Avatar>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <TrendingUp />
                </Avatar>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Modules */}
        <Box>
          {modules.map((module) => (
            <ModuleDetailCard key={module.id} module={module} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default LearningPage;