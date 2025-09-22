// src/components/common/LazyWrapper.tsx
import React, { Suspense } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minHeight?: number;
}

const DefaultFallback: React.FC<{ minHeight?: number }> = ({ minHeight = 400 }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight,
      gap: 2,
    }}
  >
    <CircularProgress size={48} />
    <Typography variant="body2" color="text.secondary">
      Memuat komponen...
    </Typography>
  </Box>
);

const LazyWrapper: React.FC<LazyWrapperProps> = ({ 
  children, 
  fallback, 
  minHeight 
}) => {
  return (
    <Suspense fallback={fallback || <DefaultFallback minHeight={minHeight} />}>
      {children}
    </Suspense>
  );
};

export default LazyWrapper;
