import React from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
} from '@mui/material';
import {
  Home,
  Search,
  ArrowBack,
  School,
  Assignment,
  Analytics,
  Person,
  Explore,
  Help,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const QuickLinkCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: 'primary' | 'secondary' | 'success' | 'warning';
}> = ({ title, description, icon, path, color }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        }
      }}
      onClick={() => navigate(path)}
    >
      <CardContent sx={{ textAlign: 'center', pb: 1 }}>
        <Avatar
          sx={{
            bgcolor: `${color}.main`,
            width: 56,
            height: 56,
            mx: 'auto',
            mb: 2,
          }}
        >
          {icon}
        </Avatar>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button size="small" color={color}>
          Go to {title}
        </Button>
      </CardActions>
    </Card>
  );
};

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const quickLinks = [
    {
      title: 'Dashboard',
      description: 'Return to your learning dashboard',
      icon: <Home />,
      path: '/',
      color: 'primary' as const,
    },
    {
      title: 'Learning',
      description: 'Browse available learning modules',
      icon: <School />,
      path: '/learning',
      color: 'secondary' as const,
    },
    {
      title: 'Practice',
      description: 'Try essay practice with AI feedback',
      icon: <Assignment />,
      path: '/practice',
      color: 'success' as const,
    },
    {
      title: 'Analytics',
      description: 'View your learning progress',
      icon: <Analytics />,
      path: '/analytics',
      color: 'warning' as const,
    },
  ];

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: 'calc(100vh - 80px)' }}>
      <Container maxWidth="md" sx={{ py: 8 }}>
        {/* Main 404 Section */}
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 4,
            mb: 6,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            border: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          {/* 404 Illustration */}
          <Box
            sx={{
              width: 200,
              height: 200,
              mx: 'auto',
              mb: 4,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            <Typography
              variant="h1"
              sx={{
                fontSize: '4rem',
                color: 'white',
                fontWeight: 'bold',
                zIndex: 1,
              }}
            >
              404
            </Typography>
          </Box>

          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Oops! Page Not Found
          </Typography>

          <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
            The page you're looking for doesn't exist or has been moved.
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Don't worry! You can use the navigation above or try one of these popular sections:
          </Typography>

          {/* Action Buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              size="large"
              sx={{ px: 4 }}
            >
              Go Back
            </Button>
            <Button
              variant="outlined"
              startIcon={<Home />}
              onClick={() => navigate('/')}
              size="large"
              sx={{ px: 4 }}
            >
              Home Page
            </Button>
          </Stack>
        </Paper>

        {/* Quick Navigation */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
            Where would you like to go?
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" paragraph>
            Choose from these popular sections of GeoCetak
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {quickLinks.map((link, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <QuickLinkCard {...link} />
            </Grid>
          ))}
        </Grid>

        {/* Help Section */}
        <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
          <Avatar
            sx={{
              bgcolor: 'info.main',
              width: 64,
              height: 64,
              mx: 'auto',
              mb: 2,
            }}
          >
            <Help sx={{ fontSize: 32 }} />
          </Avatar>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Still Need Help?
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            If you believe this is an error or you need assistance finding what you're looking for,
            you can return to the main dashboard or explore our learning modules.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              startIcon={<Explore />}
              onClick={() => navigate('/learning')}
            >
              Explore Modules
            </Button>
            <Button
              variant="outlined"
              startIcon={<Person />}
              onClick={() => navigate('/profile')}
            >
              View Profile
            </Button>
          </Stack>
        </Paper>

        {/* Search Suggestion */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            <Search sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
            Tip: Use the navigation menu above to find what you're looking for
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFoundPage;