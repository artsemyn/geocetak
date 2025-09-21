import React from 'react';
import { Box, Typography, Container } from '@mui/material';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  backgroundGradient?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  children,
  backgroundGradient = true,
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        fontWeight="bold"
        sx={{
          ...(backgroundGradient && {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }),
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h6" color="text.secondary" paragraph>
          {subtitle}
        </Typography>
      )}
      {children}
    </Box>
  );
};

export default PageHeader;