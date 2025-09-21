import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  Card,
  CardContent,
  Stack,
  Chip,
  Divider,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  Alert,
  Badge,
} from '@mui/material';
import {
  Person,
  Email,
  School,
  EmojiEvents,
  Settings,
  Notifications,
  Security,
  Language,
  Palette,
  Edit,
  Save,
  Cancel,
  Star,
  CheckCircle,
  TrendingUp,
  AccessTime,
} from '@mui/icons-material';
import { useUserStore } from '../stores/userStore';

const ProfileSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => (
  <Paper sx={{ p: 3, mb: 3 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
        {icon}
      </Avatar>
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
    </Box>
    {children}
  </Paper>
);

const BadgeCard: React.FC<{
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}> = ({ title, description, icon, earned, earnedDate }) => (
  <Card
    sx={{
      p: 2,
      textAlign: 'center',
      border: '2px solid',
      borderColor: earned ? 'primary.main' : 'grey.200',
      bgcolor: earned ? 'primary.light' : 'grey.50',
      opacity: earned ? 1 : 0.6,
    }}
  >
    <Typography variant="h3" sx={{ mb: 1 }}>
      {icon}
    </Typography>
    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
      {title}
    </Typography>
    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
      {description}
    </Typography>
    {earned && earnedDate && (
      <Chip
        label={`Earned: ${earnedDate}`}
        size="small"
        color="primary"
        sx={{ mt: 1 }}
      />
    )}
  </Card>
);

const ProfilePage: React.FC = () => {
  const { profile, xp, level, badges, completedModules } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    school: profile.school || '',
    bio: profile.bio || '',
  });
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'id',
    autoSave: true,
  });

  const handleSave = () => {
    // Here you would typically update the user profile
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: profile.name,
      email: profile.email,
      school: profile.school || '',
      bio: profile.bio || '',
    });
    setIsEditing(false);
  };

  const achievementBadges = [
    {
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      earned: true,
      earnedDate: '2024-01-15',
    },
    {
      title: 'Cylinder Master',
      description: 'Complete cylinder module',
      icon: '🔵',
      earned: completedModules.includes('cylinder'),
      earnedDate: completedModules.includes('cylinder') ? '2024-01-20' : undefined,
    },
    {
      title: 'Quiz Champion',
      description: 'Score 100% on 5 quizzes',
      icon: '🏆',
      earned: false,
    },
    {
      title: 'Learning Streak',
      description: 'Study for 7 consecutive days',
      icon: '🔥',
      earned: true,
      earnedDate: '2024-01-18',
    },
    {
      title: 'Explorer',
      description: 'Try all interactive features',
      icon: '🧭',
      earned: false,
    },
    {
      title: 'Scholar',
      description: 'Complete all modules',
      icon: '🎓',
      earned: false,
    },
  ];

  const earnedBadges = achievementBadges.filter(badge => badge.earned);
  const totalStudyTime = 145; // minutes
  const totalQuizzes = 12;
  const averageScore = 85;

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
            Profile & Settings
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Manage your account, track achievements, and customize your learning experience
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Left Column - Profile Info */}
          <Grid item xs={12} md={8}>
            {/* Basic Info */}
            <ProfileSection title="Profile Information" icon={<Person />}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge
                    badgeContent={level}
                    color="primary"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: 'primary.main',
                        fontSize: '2rem',
                        mr: 3,
                      }}
                    >
                      {profile.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </Badge>
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {profile.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Level {level} • {xp.toLocaleString()} XP
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant={isEditing ? 'outlined' : 'contained'}
                  startIcon={isEditing ? <Cancel /> : <Edit />}
                  onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="School/Institution"
                    value={editForm.school}
                    onChange={(e) => setEditForm({ ...editForm, school: e.target.value })}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <School sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Bio"
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                  />
                </Grid>
              </Grid>

              {isEditing && (
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </ProfileSection>

            {/* Learning Statistics */}
            <ProfileSection title="Learning Statistics" icon={<TrendingUp />}>
              <Grid container spacing={3}>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary.main" fontWeight="bold">
                      {completedModules.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Modules Completed
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main" fontWeight="bold">
                      {earnedBadges.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Badges Earned
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="warning.main" fontWeight="bold">
                      {Math.floor(totalStudyTime / 60)}h {totalStudyTime % 60}m
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Study Time
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="secondary.main" fontWeight="bold">
                      {averageScore}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg. Quiz Score
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </ProfileSection>

            {/* Settings */}
            <ProfileSection title="Settings & Preferences" icon={<Settings />}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Notifications />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive updates about your progress and new content"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.notifications}
                        onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                      />
                    }
                    label=""
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <Palette />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dark Mode"
                    secondary="Switch to dark theme for better night viewing"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.darkMode}
                        onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                      />
                    }
                    label=""
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <AccessTime />
                  </ListItemIcon>
                  <ListItemText
                    primary="Auto-save Progress"
                    secondary="Automatically save your progress as you learn"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.autoSave}
                        onChange={(e) => setSettings({ ...settings, autoSave: e.target.checked })}
                      />
                    }
                    label=""
                  />
                </ListItem>
              </List>
            </ProfileSection>
          </Grid>

          {/* Right Column - Achievements */}
          <Grid item xs={12} md={4}>
            <ProfileSection title="Achievements & Badges" icon={<EmojiEvents />}>
              <Alert severity="info" sx={{ mb: 3 }}>
                Earn badges by completing modules, maintaining streaks, and achieving high scores!
              </Alert>

              <Typography variant="h6" gutterBottom>
                Your Badges ({earnedBadges.length}/{achievementBadges.length})
              </Typography>

              <Grid container spacing={2}>
                {achievementBadges.map((badge, index) => (
                  <Grid item xs={6} key={index}>
                    <BadgeCard {...badge} />
                  </Grid>
                ))}
              </Grid>

              {earnedBadges.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Recent Achievements
                  </Typography>
                  <Stack spacing={1}>
                    {earnedBadges.slice(-3).map((badge, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 1,
                          bgcolor: 'primary.light',
                          borderRadius: 1,
                        }}
                      >
                        <Typography sx={{ mr: 1 }}>{badge.icon}</Typography>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" fontWeight={600}>
                            {badge.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {badge.earnedDate}
                          </Typography>
                        </Box>
                        <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </ProfileSection>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;