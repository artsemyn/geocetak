// src/components/analytics/LearningAnalytics.tsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  LinearProgress,
  Chip,
  Avatar,
  Paper,
  Stack,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp,
  AccessTime,
  TouchApp,
  School,
  EmojiEvents,
  Refresh,
  Analytics,
} from '@mui/icons-material';
import { useUserStore } from '../../stores/userStore';
import { useCylinderStore } from '../../stores/cylinderStore';
import { progressService } from '../../services/progressService';

interface AnalyticsData {
  totalSessions: number;
  totalTimeSpent: number;
  averageSessionTime: number;
  totalInteractions: number;
  completionRate: number;
  xpGrowth: number[];
  weeklyProgress: number[];
}

const LearningAnalytics: React.FC = () => {
  const { profile, xp, level, completedModules } = useUserStore();
  const { completedLessons, interactionCount } = useCylinderStore();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalytics = async () => {
    if (!profile) return;
    
    setIsLoading(true);
    try {
      const data = await progressService.getLearningAnalytics(profile.id);
      if (data) {
        setAnalytics({
          totalSessions: data.totalSessions,
          totalTimeSpent: data.totalTimeSpent,
          averageSessionTime: data.averageSessionTime,
          totalInteractions: interactionCount,
          completionRate: (completedLessons.length / 4) * 100,
          xpGrowth: [50, 80, 120, 150], // Mock data - bisa diganti dengan data real
          weeklyProgress: [20, 35, 60, 85, 100], // Mock data
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [profile]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}j ${minutes}m`;
    return `${minutes}m`;
  };

  const getPerformanceLevel = (completionRate: number): { label: string; color: 'success' | 'warning' | 'error' } => {
    if (completionRate >= 80) return { label: 'Excellent', color: 'success' };
    if (completionRate >= 60) return { label: 'Good', color: 'warning' };
    return { label: 'Needs Improvement', color: 'error' };
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Analytics color="primary" />
            <Typography variant="h6">Learning Analytics</Typography>
          </Box>
          <LinearProgress />
        </CardContent>
      </Card>
    );
  }

  const performanceLevel = getPerformanceLevel(analytics?.completionRate || 0);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Analytics color="primary" />
            <Typography variant="h6">Learning Analytics</Typography>
          </Box>
          <Tooltip title="Refresh Data">
            <IconButton onClick={fetchAnalytics} size="small">
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>

        <Grid container spacing={3}>
          {/* Overview Stats */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                📊 Overview
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Current Level:</Typography>
                  <Chip label={`Level ${level}`} size="small" color="primary" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Total XP:</Typography>
                  <Typography variant="body2" fontWeight="bold">{xp}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Modules Completed:</Typography>
                  <Typography variant="body2" fontWeight="bold">{completedModules.length}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Performance:</Typography>
                  <Chip 
                    label={performanceLevel.label} 
                    size="small" 
                    color={performanceLevel.color}
                  />
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Engagement Stats */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                🎯 Engagement
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.light', width: 32, height: 32 }}>
                    <AccessTime fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="body2">Total Study Time</Typography>
                    <Typography variant="h6" color="primary">
                      {formatTime(analytics?.totalTimeSpent || 0)}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'secondary.light', width: 32, height: 32 }}>
                    <TouchApp fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="body2">Interactions</Typography>
                    <Typography variant="h6" color="secondary">
                      {analytics?.totalInteractions || 0}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'success.light', width: 32, height: 32 }}>
                    <School fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="body2">Learning Sessions</Typography>
                    <Typography variant="h6" color="success.main">
                      {analytics?.totalSessions || 0}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Progress Breakdown */}
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                📈 Module Progress
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Cylinder Module</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {completedLessons.length}/4 Lessons
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(completedLessons.length / 4) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Grid container spacing={2}>
                {[
                  { id: 'concept', title: 'Konsep', icon: '🎯' },
                  { id: 'net', title: 'Jaring-jaring', icon: '🔄' },
                  { id: 'formula', title: 'Rumus', icon: '🧮' },
                  { id: 'quiz', title: 'Quiz', icon: '🧠' },
                ].map((lesson) => (
                  <Grid item xs={6} sm={3} key={lesson.id}>
                    <Box
                      sx={{
                        p: 1,
                        textAlign: 'center',
                        borderRadius: 2,
                        bgcolor: completedLessons.includes(lesson.id) 
                          ? 'success.light' 
                          : 'grey.100',
                        border: 1,
                        borderColor: completedLessons.includes(lesson.id)
                          ? 'success.main'
                          : 'grey.300',
                      }}
                    >
                      <Typography variant="h6">{lesson.icon}</Typography>
                      <Typography variant="caption" display="block">
                        {lesson.title}
                      </Typography>
                      {completedLessons.includes(lesson.id) && (
                        <EmojiEvents sx={{ fontSize: 16, color: 'success.main', mt: 0.5 }} />
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Recommendations */}
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'info.light' }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                💡 Recommendations
              </Typography>
              <Stack spacing={1}>
                {analytics && analytics.averageSessionTime < 300 && (
                  <Typography variant="body2">
                    • Try to spend more time exploring each concept for better understanding
                  </Typography>
                )}
                {analytics && analytics.totalInteractions < 50 && (
                  <Typography variant="body2">
                    • Interact more with the 3D models to enhance your learning experience
                  </Typography>
                )}
                {completedLessons.length < 4 && (
                  <Typography variant="body2">
                    • Complete all lessons in the Cylinder module to unlock the next module
                  </Typography>
                )}
                <Typography variant="body2">
                  • Practice regularly to maintain your learning momentum
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LearningAnalytics;
