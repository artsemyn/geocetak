// src/components/modules/cylinder/ProgressSummary.tsx
import React from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  Paper,
  Stack,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  EmojiEvents,
  School,
  Timer,
  TrendingUp,
  Celebration,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCylinderStore } from '../../../stores/cylinderStore';
import { useUserStore } from '../../../stores/userStore';

const ProgressSummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const { completedLessons, resetProgress } = useCylinderStore();
  const { xp, level } = useUserStore();

  const totalLessons = 4; // Konsep, Jaring-jaring, Rumus, Quiz
  const completionRate = Math.round((completedLessons.length / totalLessons) * 100);
  const earnedXP = completedLessons.length * 10; // Estimasi XP yang diperoleh

  const lessonData = [
    { id: 'concept', title: 'Konsep Tabung', icon: '🎯', xp: 10 },
    { id: 'net', title: 'Jaring-jaring', icon: '🔄', xp: 10 },
    { id: 'formula', title: 'Penemuan Rumus', icon: '🧮', xp: 10 },
    { id: 'quiz', title: 'Quiz Interaktif', icon: '🧠', xp: 15 },
  ];

  const achievements = [
    {
      title: 'Penjelajah Geometri',
      description: 'Menyelesaikan semua materi tabung',
      icon: '🏆',
      earned: completedLessons.length >= 4,
    },
    {
      title: 'Master Rumus',
      description: 'Memahami derivasi rumus tabung',
      icon: '📐',
      earned: completedLessons.includes('formula'),
    },
    {
      title: 'Quiz Champion',
      description: 'Menyelesaikan quiz dengan baik',
      icon: '🎯',
      earned: completedLessons.includes('quiz'),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Celebration */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: 'success.main',
            mx: 'auto',
            mb: 2,
          }}
        >
          <Celebration sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          🎉 Selamat!
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Anda telah menyelesaikan Modul Tabung
        </Typography>
        <Chip
          label={`${completionRate}% Selesai`}
          color="success"
          sx={{ mt: 1 }}
        />
      </Box>

      <Grid container spacing={3}>
        {/* Progress Overview */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                📊 Ringkasan Pembelajaran
              </Typography>
              <Divider sx={{ mb: 3 }} />

              {/* Overall Progress */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Progress Keseluruhan</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {completedLessons.length}/{totalLessons} Pelajaran
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={completionRate}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              {/* Lesson Breakdown */}
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Detail Pelajaran:
              </Typography>
              <Grid container spacing={2}>
                {lessonData.map((lesson) => (
                  <Grid item xs={12} sm={6} key={lesson.id}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        bgcolor: completedLessons.includes(lesson.id)
                          ? 'success.light'
                          : 'grey.100',
                        borderColor: completedLessons.includes(lesson.id)
                          ? 'success.main'
                          : 'grey.300',
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                          sx={{
                            bgcolor: completedLessons.includes(lesson.id)
                              ? 'success.main'
                              : 'grey.400',
                          }}
                        >
                          {completedLessons.includes(lesson.id) ? (
                            <CheckCircle />
                          ) : (
                            lesson.icon
                          )}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body1" fontWeight="bold">
                            {lesson.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            +{lesson.xp} XP
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Stats & Achievements */}
        <Grid item xs={12} md={4}>
          {/* XP & Stats */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                📈 Statistik
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">XP Diperoleh:</Typography>
                  <Typography variant="body2" fontWeight="bold" color="primary">
                    +{earnedXP} XP
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Level Saat Ini:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    Level {level}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Total XP:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {xp} XP
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                🏆 Pencapaian
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Stack spacing={2}>
                {achievements.map((achievement, index) => (
                  <Paper
                    key={index}
                    variant="outlined"
                    sx={{
                      p: 2,
                      bgcolor: achievement.earned ? 'warning.light' : 'grey.100',
                      borderColor: achievement.earned ? 'warning.main' : 'grey.300',
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        sx={{
                          bgcolor: achievement.earned ? 'warning.main' : 'grey.400',
                        }}
                      >
                        {achievement.earned ? <EmojiEvents /> : achievement.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {achievement.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {achievement.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                🚀 Langkah Selanjutnya
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<School />}
                    onClick={() => navigate('/learning')}
                  >
                    Modul Lainnya
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    startIcon={<TrendingUp />}
                    onClick={() => navigate('/practice')}
                  >
                    Latihan Soal
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Timer />}
                    onClick={() => {
                      resetProgress();
                      window.location.reload();
                    }}
                  >
                    Ulangi Modul
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="text"
                    endIcon={<ArrowForward />}
                    onClick={() => navigate('/dashboard')}
                  >
                    Dashboard
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProgressSummaryPage;
