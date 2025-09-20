import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Layout from '../layout/Layout';
import { theme } from '../../styles/theme';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Layout', () => {
  it('renders app name', () => {
    renderWithProviders(<Layout />);
    expect(screen.getByText('GeoCetak')).toBeInTheDocument();
  });
});