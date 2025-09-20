import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid,
  Avatar,
  Stack,
} from '@mui/material';
import {
  EmojiEvents,
  Star,
  CheckCircle,
  Lock,
  BookmarkBorder,
  Assignment,
} from '@mui/icons-material';
import { useUserStore } from '../../../stores/userStore';
import { useCylinderStore } from '../../../stores/cylinderStore';

interface LessonProgress {
  id: string;
  title: string;
  completed: boolean;
  xp: number;
  badge?: string;
}

const cylinderLessons: LessonProgress[] = [
  { id: 'concept', title: 'Konsep & Unsur', completed: false, xp: 20, badge: '🎯' },
  { id: 'net', title: 'Jaring-jaring', completed: false, xp: 25, badge: '🔄' },
  { id: 'formula', title: 'Penemuan Rumus', completed: false, xp: 30, badge: '🧮' },
  { id: 'quiz', title: 'Quiz & Latihan', completed: false, xp: 35, badge: '📝' },
];

const ProgressTracker: React.FC = () => {
  const { xp, level, badges } = useUserStore();
  const { completedLessons } = useCylinderStore();
  
  // Update lesson completion status
  const updatedLessons = cylinderLessons.map(lesson => ({
    ...lesson,
    completed: completedLessons.includes(lesson.id)
  }));

  const totalXP = cylinderLessons.reduce((sum, lesson) => sum + lesson.xp, 0);
  const earnedXP = updatedLessons
    .filter(lesson => lesson.completed)
    .reduce((sum, lesson) => sum + lesson.xp, 0);

  const levelProgress = (xp % 100) / 100 * 100;

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <BookmarkBorder sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" fontWeight="bold">
            Status Pembelajaran
          </Typography>
        </Box>

        {/* Current Stats - No Overall Progress Bar */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 1, width: 56, height: 56 }}>
                <EmojiEvents sx={{ fontSize: 28 }} />
              </Avatar>
              <Typography variant="h6" fontWeight="bold">Level {level}</Typography>
              <Typography variant="body2" color="text.secondary">
                {xp} XP Total
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'secondary.main', mx: 'auto', mb: 1, width: 56, height: 56 }}>
                <Assignment sx={{ fontSize: 28 }} />
              </Avatar>
              <Typography variant="h6" fontWeight="bold">{completedLessons.length}/4</Typography>
              <Typography variant="body2" color="text.secondary">
                Pelajaran
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Individual Lesson Status - No Progress Bars */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          📚 Daftar Pelajaran
        </Typography>
        
        <Stack spacing={2}>
          {updatedLessons.map((lesson, index) => {
            const isCompleted = lesson.completed;
            const isActive = index === 0 || updatedLessons[index - 1]?.completed;
            const isLocked = !isActive && !isCompleted;
            
            return (
              <Box
                key={lesson.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 2,
                  bgcolor: isCompleted 
                    ? 'success.light' 
                    : isActive 
                      ? 'primary.light' 
                      : 'grey.100',
                  border: 1,
                  borderColor: isCompleted 
                    ? 'success.main' 
                    : isActive 
                      ? 'primary.main' 
                      : 'grey.300',
                  opacity: isLocked ? 0.6 : 1,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: isLocked ? 'none' : 'translateX(4px)',
                  }
                }}
              >
                <Box sx={{ mr: 2, fontSize: '1.5rem' }}>
                  {isCompleted ? (
                    <CheckCircle color="success" sx={{ fontSize: 28 }} />
                  ) : isLocked ? (
                    <Lock color="disabled" sx={{ fontSize: 28 }} />
                  ) : (
                    <Box sx={{ 
                      width: 28, 
                      height: 28, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.2rem'
                    }}>
                      {lesson.badge}
                    </Box>
                  )}
                </Box>
                
                <Box sx={{ flexGrow: 1 }}>
                  <Typography 
                    variant="body1" 
                    fontWeight={isCompleted ? 'bold' : isActive ? 'medium' : 'normal'}
                    color={isLocked ? 'text.secondary' : 'text.primary'}
                  >
                    {lesson.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {isCompleted 
                      ? '✅ Selesai' 
                      : isActive 
                        ? '▶️ Tersedia' 
                        : '🔒 Terkunci'
                    }
                  </Typography>
                </Box>
                
                <Chip
                  label={`${lesson.xp} XP`}
                  size="small"
                  color={isCompleted ? "success" : isActive ? "primary" : "default"}
                  variant={isCompleted ? "filled" : "outlined"}
                />
              </Box>
            );
          })}
        </Stack>

        {/* Level Progress - Keep This */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            🎯 Progress Level
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Level {level} → Level {level + 1}</Typography>
            <Typography variant="body2">{Math.round(levelProgress)}%</Typography>
          </Box>
          <Box sx={{ 
            height: 8, 
            bgcolor: 'grey.200', 
            borderRadius: 4,
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              height: '100%', 
              width: `${levelProgress}%`,
              background: 'linear-gradient(90deg, #2196F3, #21CBF3)',
              borderRadius: 4,
              transition: 'width 0.3s ease'
            }} />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            {100 - (xp % 100)} XP lagi untuk level berikutnya
          </Typography>
        </Box>

        {/* Next Goal */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight="bold" color="warning.dark" gutterBottom>
            🎯 Target Selanjutnya
          </Typography>
          <Typography variant="body2" color="warning.dark">
            {completedLessons.length === 4 
              ? "🎉 Modul selesai! Siap lanjut ke Kerucut?" 
              : `Selesaikan ${updatedLessons.find(l => !l.completed)?.title} untuk ${updatedLessons.find(l => !l.completed)?.xp} XP`
            }
          </Typography>
        </Box>

        {/* Achievements - Only if any */}
        {badges.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              🏆 Achievement
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {badges.map((badge) => (
                <Chip
                  key={badge.id}
                  label={badge.name}
                  color="warning"
                  size="small"
                  icon={<Star />}
                />
              ))}
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;