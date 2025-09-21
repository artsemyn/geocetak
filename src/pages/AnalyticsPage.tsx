import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Chip,
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

const StatCard: React.FC<{
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'secondary';
  trend?: number;
}> = ({ title, value, subtitle, icon, color, trend }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: `${color}.main`, mr: 2, width: 48, height: 48 }}>
          {icon}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" fontWeight="bold" color={`${color}.dark`}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            {title}
          </Typography>
        </Box>
        {trend && (
          <Box sx={{ textAlign: 'right' }}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
              <Typography variant="caption" color="success.main" fontWeight={600}>
                +{trend}%
              </Typography>
            </Stack>
          </Box>
        )}
      </Box>
      <Typography variant="caption" color="text.secondary">
        {subtitle}
      </Typography>
    </CardContent>
  </Card>
);

const ProgressCard: React.FC<{
  title: string;
  current: number;
  total: number;
  percentage: number;
  color: string;
}> = ({ title, current, total, percentage, color }) => (
  <Paper sx={{ p: 3, height: '100%' }}>
    <Typography variant="h6" fontWeight="bold" gutterBottom>
      {title}
    </Typography>
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {current} dari {total} selesai
        </Typography>
        <Typography variant="body2" color={`${color}.main`} fontWeight={600}>
          {percentage}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{ height: 8, borderRadius: 4 }}
        color={color as any}
      />
    </Box>
    <Stack direction="row" spacing={1}>
      <Chip size="small" label={`${current} Completed`} color="success" />
      <Chip size="small" label={`${total - current} Remaining`} variant="outlined" />
    </Stack>
  </Paper>
);

const AnalyticsPage: React.FC = () => {
  const { xp, level, badges, completedModules } = useUserStore();

  // Mock data for analytics
  const totalModules = 3;
  const completedCount = completedModules.length;
  const totalLessons = 12;
  const completedLessons = 8;
  const totalQuizzes = 6;
  const completedQuizzes = 4;
  const studyTime = 145; // in minutes

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
            Analytics Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Track your learning progress and achievements across all modules
          </Typography>
        </Box>

        {/* Key Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total XP"
              value={xp.toLocaleString()}
              subtitle="Experience points earned"
              icon={<EmojiEvents />}
              color="primary"
              trend={12}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Current Level"
              value={`Level ${level}`}
              subtitle="Learning progression"
              icon={<School />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Study Time"
              value={`${Math.floor(studyTime / 60)}h ${studyTime % 60}m`}
              subtitle="Total learning time"
              icon={<AccessTime />}
              color="warning"
              trend={8}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Badges"
              value={badges.length}
              subtitle="Achievements unlocked"
              icon={<CheckCircle />}
              color="secondary"
            />
          </Grid>
        </Grid>

        {/* Progress Breakdown */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <ProgressCard
              title="Modules Progress"
              current={completedCount}
              total={totalModules}
              percentage={Math.round((completedCount / totalModules) * 100)}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ProgressCard
              title="Lessons Completed"
              current={completedLessons}
              total={totalLessons}
              percentage={Math.round((completedLessons / totalLessons) * 100)}
              color="success"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ProgressCard
              title="Quizzes Taken"
              current={completedQuizzes}
              total={totalQuizzes}
              percentage={Math.round((completedQuizzes / totalQuizzes) * 100)}
              color="warning"
            />
          </Grid>
        </Grid>

        {/* Detailed Analytics */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3, height: 400 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <Timeline />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  Learning Progress Over Time
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'grey.100',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <BarChart sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Progress Chart
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Interactive charts will be implemented here
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3, height: 400 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                  <Assessment />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  Performance Summary
                </Typography>
              </Box>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Average Quiz Score
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={85}
                      sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                      color="success"
                    />
                    <Typography variant="h6" color="success.main" fontWeight="bold">
                      85%
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Completion Rate
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={67}
                      sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                      color="primary"
                    />
                    <Typography variant="h6" color="primary.main" fontWeight="bold">
                      67%
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Learning Streak
                  </Typography>
                  <Typography variant="h4" color="warning.main" fontWeight="bold">
                    7 days
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Keep it up! Your longest streak was 12 days.
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AnalyticsPage;