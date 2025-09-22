// src/tests/components/CylinderLessonLayout.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CylinderLessonLayout from '../../pages/CylinderLessonLayout';
import { theme } from '../../styles/theme';
import { useCylinderStore } from '../../stores/cylinderStore';
import { useUserStore } from '../../stores/userStore';

// Mock the stores
jest.mock('../../stores/cylinderStore');
jest.mock('../../stores/userStore');

// Mock React Three Fiber components
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn(),
}));

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
  Environment: () => <div data-testid="environment" />,
  ContactShadows: () => <div data-testid="contact-shadows" />,
}));

const mockCylinderStore = {
  radius: 1,
  height: 2,
  showWireframe: false,
  showNet: false,
  isAnimating: false,
  volume: 6.283,
  surfaceArea: 18.849,
  completedLessons: [],
  interactionCount: 0,
  setRadius: jest.fn(),
  setHeight: jest.fn(),
  toggleWireframe: jest.fn(),
  toggleNet: jest.fn(),
  setAnimating: jest.fn(),
  calculateValues: jest.fn(),
  completeLesson: jest.fn(),
  incrementInteraction: jest.fn(),
};

const mockUserStore = {
  profile: { id: 'test-user', name: 'Test User', email: 'test@example.com', createdAt: '2024-01-01' },
  xp: 100,
  level: 1,
  badges: [],
  completedModules: [],
  currentSessionId: null,
  addXP: jest.fn(),
  startLearningSession: jest.fn(),
  endLearningSession: jest.fn(),
  syncProgress: jest.fn(),
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('CylinderLessonLayout', () => {
  beforeEach(() => {
    (useCylinderStore as jest.Mock).mockReturnValue(mockCylinderStore);
    (useUserStore as jest.Mock).mockReturnValue(mockUserStore);
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render main components', () => {
      renderWithProviders(<CylinderLessonLayout />);
      
      expect(screen.getByText(/Modul Pembelajaran: Tabung/i)).toBeInTheDocument();
      expect(screen.getByTestId('canvas')).toBeInTheDocument();
      expect(screen.getByText(/Kontrol Interaktif/i)).toBeInTheDocument();
    });

    it('should render all tabs', () => {
      renderWithProviders(<CylinderLessonLayout />);
      
      expect(screen.getByText('Konsep')).toBeInTheDocument();
      expect(screen.getByText('Jaring-jaring')).toBeInTheDocument();
      expect(screen.getByText('Rumus')).toBeInTheDocument();
      expect(screen.getByText('Quiz')).toBeInTheDocument();
    });

    it('should display current parameter values', () => {
      renderWithProviders(<CylinderLessonLayout />);
      
      expect(screen.getByText(/Jari-jari \(r\): 1\.0/)).toBeInTheDocument();
      expect(screen.getByText(/Tinggi \(t\): 2\.0/)).toBeInTheDocument();
    });
  });

  describe('Interactive Controls', () => {
    it('should have radius and height sliders', () => {
      renderWithProviders(<CylinderLessonLayout />);
      
      const sliders = screen.getAllByRole('slider');
      expect(sliders).toHaveLength(2);
    });

    it('should have control switches', () => {
      renderWithProviders(<CylinderLessonLayout />);
      
      expect(screen.getByText('Animasi Rotasi')).toBeInTheDocument();
      expect(screen.getByText('Mode Wireframe')).toBeInTheDocument();
      expect(screen.getByText('Tampilkan Jaring-jaring')).toBeInTheDocument();
    });

    it('should call setRadius when radius slider changes', () => {
      renderWithProviders(<CylinderLessonLayout />);
      
      const sliders = screen.getAllByRole('slider');
      const radiusSlider = sliders[0];
      
      fireEvent.change(radiusSlider, { target: { value: '2.5' } });
      
      expect(mockCylinderStore.setRadius).toHaveBeenCalledWith(2.5);
    });

    it('should call setHeight when height slider changes', () => {
      renderWithProviders(<CylinderLessonLayout />);
      
      const sliders = screen.getAllByRole('slider');
      const heightSlider = sliders[1];
      
      fireEvent.change(heightSlider, { target: { value: '3.5' } });
      
      expect(mockCylinderStore.setHeight).toHaveBeenCalledWith(3.5);
    });
  });

  describe('Tab Navigation', () => {
    it('should switch tabs correctly', async () => {
      renderWithProviders(<CylinderLessonLayout />);
      
      const netTab = screen.getByText('Jaring-jaring');
      fireEvent.click(netTab);
      
      await waitFor(() => {
        expect(mockCylinderStore.completeLesson).toHaveBeenCalledWith('net');
        expect(mockUserStore.addXP).toHaveBeenCalledWith(10);
      });
    });

    it('should start and end learning sessions on tab change', async () => {
      renderWithProviders(<CylinderLessonLayout />);
      
      const formulaTab = screen.getByText('Rumus');
      fireEvent.click(formulaTab);
      
      await waitFor(() => {
        expect(mockUserStore.endLearningSession).toHaveBeenCalled();
        expect(mockUserStore.startLearningSession).toHaveBeenCalledWith('cylinder', 'formula');
      });
    });
  });

  describe('Learning Session Management', () => {
    it('should start learning session on component mount', () => {
      renderWithProviders(<CylinderLessonLayout />);
      
      expect(mockUserStore.startLearningSession).toHaveBeenCalledWith('cylinder', 'overview');
    });

    it('should end learning session on component unmount', () => {
      const { unmount } = renderWithProviders(<CylinderLessonLayout />);
      
      unmount();
      
      expect(mockUserStore.endLearningSession).toHaveBeenCalledWith(mockCylinderStore.interactionCount);
    });
  });

  describe('Progress Completion', () => {
    it('should show ProgressSummaryPage when all lessons completed', () => {
      const completedStore = {
        ...mockCylinderStore,
        completedLessons: ['concept', 'net', 'formula', 'quiz'],
      };
      
      (useCylinderStore as jest.Mock).mockReturnValue(completedStore);
      
      renderWithProviders(<CylinderLessonLayout />);
      
      // Should render ProgressSummaryPage instead of main layout
      expect(screen.queryByText(/Modul Pembelajaran: Tabung/i)).not.toBeInTheDocument();
    });
  });

  describe('Lesson Content', () => {
    it('should display concept lesson content by default', () => {
      renderWithProviders(<CylinderLessonLayout />);
      
      expect(screen.getByText(/Konsep dan Unsur-unsur Tabung/i)).toBeInTheDocument();
      expect(screen.getByText(/Tabung adalah bangun ruang/i)).toBeInTheDocument();
    });

    it('should display formula content when formula tab is active', async () => {
      renderWithProviders(<CylinderLessonLayout />);
      
      const formulaTab = screen.getByText('Rumus');
      fireEvent.click(formulaTab);
      
      await waitFor(() => {
        expect(screen.getByText(/Penemuan Rumus Tabung/i)).toBeInTheDocument();
        expect(screen.getByText(/Volume Tabung/i)).toBeInTheDocument();
        expect(screen.getByText(/Luas Permukaan Tabung/i)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      renderWithProviders(<CylinderLessonLayout />);
      
      const sliders = screen.getAllByRole('slider');
      expect(sliders[0]).toHaveAttribute('aria-label', expect.stringContaining('radius'));
      expect(sliders[1]).toHaveAttribute('aria-label', expect.stringContaining('height'));
    });

    it('should be keyboard navigable', () => {
      renderWithProviders(<CylinderLessonLayout />);
      
      const tabs = screen.getAllByRole('tab');
      tabs.forEach(tab => {
        expect(tab).toHaveAttribute('tabindex');
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle store errors gracefully', () => {
      const errorStore = {
        ...mockCylinderStore,
        setRadius: jest.fn().mockImplementation(() => {
          throw new Error('Store error');
        }),
      };
      
      (useCylinderStore as jest.Mock).mockReturnValue(errorStore);
      
      // Should not crash the component
      expect(() => renderWithProviders(<CylinderLessonLayout />)).not.toThrow();
    });
  });
});
