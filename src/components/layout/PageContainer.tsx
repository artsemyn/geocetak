// src/components/layout/PageContainer.tsx
import React from 'react';
import { Box, Container } from '@mui/material';

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const PageContainer: React.FC<PageContainerProps> = ({ children, maxWidth = 'xl' }) => (
    <Box sx={{ bgcolor: 'grey.50', minHeight: 'calc(100vh - 80px)' }}>
        <Container maxWidth={maxWidth} sx={{ py: 4 }}>{children}</Container>
    </Box>
);

export default PageContainer;
