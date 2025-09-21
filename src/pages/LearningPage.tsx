
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  LinearProgress,
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
} from '@mui/material';
import {
  School,
  PlayArrow,
  Lock,
  CheckCircle,
  Star,
  AccessTime,
  ExpandMore,
  BookmarkBorder,
  ThreeDRotation,
  Calculate,
  Quiz,
  Assignment,
  PlayCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { useCylinderStore } from '../stores/cylinderStore';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';

// ... (Interface SubLesson dan Module tetap sama)
interface SubLesson {
  id: string;
  title: string;
  type: 'concept' | 'interactive' | 'formula' | 'quiz' | 'project';
  duration: number;
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


const ModuleDetailCard: React.FC<{ module: Module }> = ({ module }) => {
  const navigate = useNavigate();
  
  const completedSubLessons = module.subLessons.filter(sub => sub.isCompleted).length;
  const totalSubLessons = module.subLessons.length;
  const detailProgress = totalSubLessons > 0 ? (completedSubLessons / totalSubLessons) * 100 : 0;

  return (
    <Card 
      sx={{ 
        mb: 3,
        opacity: module.isAvailable ? 1 : 0.7,
        transition: 'all 0.3s ease',
        '&:hover': {
            boxShadow: 4,
            transform: 'translateY(-4px)'
        }
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Grid container spacing={3} alignItems="center">
            {/* Left side: Icon and Info */}
            <Grid item xs={12} md={7}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 64, height: 64, fontSize: '2.5rem', mr: 3, bgcolor: module.isAvailable ? 'primary.main' : 'grey.400', color: 'white' }}>
                        {module.icon}
                    </Avatar>
                    <Box>
                        <Typography variant="h5" fontWeight="bold">{module.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{module.description}</Typography>
                         <Stack direction="row" spacing={1} flexWrap="wrap">
                            <Chip label={module.difficulty} color="secondary" size="small"/>
                            <Chip label={module.estimatedTime} icon={<AccessTime sx={{fontSize: 16}} />} size="small" variant="outlined"/>
                            <Chip label={`${module.xpReward} XP`} icon={<Star sx={{fontSize: 16}} />} color="primary" size="small"/>
                        </Stack>
                    </Box>
                </Box>
            </Grid>
            {/* Right side: Progress and Actions */}
            <Grid item xs={12} md={5}>
                 <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                         Progres: {completedSubLessons}/{totalSubLessons}
                        </Typography>
                        <Typography variant="body2" color="primary.main" fontWeight={600}>
                         {Math.round(detailProgress)}%
                        </Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={detailProgress} sx={{ height: 8, borderRadius: 4 }}/>
                </Box>
                 <Button
                    variant={module.isCompleted ? "outlined" : "contained"}
                    startIcon={module.isCompleted ? <CheckCircle /> : module.isAvailable ? <PlayArrow /> : <Lock />}
                    onClick={() => module.isAvailable && navigate(`/module/${module.id}`)}
                    disabled={!module.isAvailable}
                    fullWidth
                    size="large"
                    sx={{ fontWeight: 600 }}
                    >
                    {module.isCompleted ? 'Ulas Kembali' : module.isAvailable ? 'Mulai Belajar' : 'Terkunci'}
                </Button>
            </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const LearningPage: React.FC = () => {
  const { completedModules } = useUserStore();
  const { completedLessons } = useCylinderStore();

  const modules: Module[] = [
    {
      id: 'cylinder',
      title: 'Tabung (Cylinder)',
      description: 'Pelajari konsep tabung melalui visualisasi 3D interaktif dan penemuan rumus.',
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
        'Menurunkan rumus volume dan luas permukaan',
        'Mengaplikasikan konsep tabung dalam kehidupan sehari-hari',
      ],
      subLessons: [
        { id: 'concept', title: 'Konsep & Unsur-Unsur', type: 'concept', duration: 10, isCompleted: completedLessons.includes('concept'), description: '' },
        { id: 'net', title: 'Jaring-Jaring Interaktif', type: 'interactive', duration: 8, isCompleted: completedLessons.includes('net'), description: '' },
        { id: 'formula', title: 'Penemuan Rumus', type: 'formula', duration: 15, isCompleted: completedLessons.includes('formula'), description: '' },
        { id: 'quiz', title: 'Quiz & Latihan', type: 'quiz', duration: 12, isCompleted: completedLessons.includes('quiz'), description: '' }
      ]
    },
    {
      id: 'cone',
      title: 'Kerucut (Cone)',
      description: 'Eksplorasi mendalam tentang kerucut dan aplikasinya dalam kehidupan.',
      icon: '🔺',
      isAvailable: completedModules.includes('cylinder'),
      isCompleted: completedModules.includes('cone'),
      progress: 0,
      estimatedTime: '50 menit',
      xpReward: 120,
      difficulty: 'Menengah',
      prerequisites: ['Modul Tabung'],
      learningObjectives: [],
      subLessons: []
    },
    {
      id: 'sphere',
      title: 'Bola (Sphere)',
      description: 'Memahami geometri bola dan hubungannya dengan bangun ruang lainnya.',
      icon: '⚪',
      isAvailable: completedModules.includes('cone'),
      isCompleted: completedModules.includes('sphere'),
      progress: 0,
      estimatedTime: '55 menit',
      xpReward: 130,
      difficulty: 'Lanjutan',
      prerequisites: ['Modul Tabung', 'Modul Kerucut'],
      learningObjectives: [],
      subLessons: []
    }
  ];

  return (
    <PageContainer>
        <PageHeader
            title="Jelajahi Modul Pembelajaran"
            subtitle="Pilih modul untuk memulai petualangan geometri 3D Anda."
        />
        {/* Cukup tambahkan "display: 'flex'" di sini */}
        <Grid container spacing={3} sx={{ display: 'flex' }}>
            {modules.map((module) => (
                <Grid item xs={12} key={module.id}>
                    <ModuleDetailCard module={module} />
                </Grid>
            ))}
        </Grid>
    </PageContainer>
    );
};

export default LearningPage;