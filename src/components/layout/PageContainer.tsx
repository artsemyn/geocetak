import React from 'react';
import { Box, Container } from '@mui/material';

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'grey' | 'transparent';
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  maxWidth = 'xl',
  background = 'grey',
}) => {
  const getBackgroundColor = () => {
    switch (background) {
      case 'default':
        return 'background.default';
      case 'grey':
        return 'grey.50';
      case 'transparent':
        return 'transparent';
      default:
        return 'grey.50';
    }
  };

  return (
    <Box sx={{ bgcolor: getBackgroundColor(), minHeight: 'calc(100vh - 80px)' }}>
      <Container maxWidth={maxWidth} sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default PageContainer;