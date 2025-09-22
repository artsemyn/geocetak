// src/tests/stores/cylinderStore.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCylinderStore } from '../../stores/cylinderStore';

describe('CylinderStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useCylinderStore.getState().resetProgress();
  });

  describe('Basic State Management', () => {
    it('should have correct initial values', () => {
      const { result } = renderHook(() => useCylinderStore());
      
      expect(result.current.radius).toBe(1);
      expect(result.current.height).toBe(2);
      expect(result.current.showWireframe).toBe(false);
      expect(result.current.showNet).toBe(false);
      expect(result.current.isAnimating).toBe(false);
      expect(result.current.completedLessons).toEqual([]);
      expect(result.current.interactionCount).toBe(0);
    });

    it('should update radius correctly', () => {
      const { result } = renderHook(() => useCylinderStore());
      
      act(() => {
        result.current.setRadius(2.5);
      });
      
      expect(result.current.radius).toBe(2.5);
      expect(result.current.interactionCount).toBe(1);
    });

    it('should update height correctly', () => {
      const { result } = renderHook(() => useCylinderStore());
      
      act(() => {
        result.current.setHeight(3.5);
      });
      
      expect(result.current.height).toBe(3.5);
      expect(result.current.interactionCount).toBe(1);
    });
  });

  describe('Volume and Surface Area Calculations', () => {
    it('should calculate volume correctly', () => {
      const { result } = renderHook(() => useCylinderStore());
      
      act(() => {
        result.current.setRadius(2);
        result.current.setHeight(3);
      });
      
      // V = π × r² × h = π × 4 × 3 = 12π ≈ 37.699
      expect(result.current.volume).toBeCloseTo(37.699, 2);
    });

    it('should calculate surface area correctly', () => {
      const { result } = renderHook(() => useCylinderStore());
      
      act(() => {
        result.current.setRadius(2);
        result.current.setHeight(3);
      });
      
      // SA = 2π × r × (r + h) = 2π × 2 × (2 + 3) = 20π ≈ 62.832
      expect(result.current.surfaceArea).toBeCloseTo(62.832, 2);
    });

    it('should recalculate when parameters change', () => {
      const { result } = renderHook(() => useCylinderStore());
      
      act(() => {
        result.current.setRadius(1);
        result.current.setHeight(1);
      });
      
      const initialVolume = result.current.volume;
      
      act(() => {
        result.current.setRadius(2);
      });
      
      expect(result.current.volume).not.toBe(initialVolume);
      expect(result.current.volume).toBeCloseTo(12.566, 2); // π × 4 × 1
    });
  });

  describe('Lesson Progress', () => {
    it('should complete lessons correctly', () => {
      const { result } = renderHook(() => useCylinderStore());
      
      act(() => {
        result.current.completeLesson('concept');
      });
      
      expect(result.current.completedLessons).toContain('concept');
    });

    it('should not duplicate completed lessons', () => {
      const { result } = renderHook(() => useCylinderStore());
      
      act(() => {
        result.current.completeLesson('concept');
        result.current.completeLesson('concept');
      });
      
      expect(result.current.completedLessons).toEqual(['concept']);
    });

    it('should reset progress correctly', () => {
      const { result } = renderHook(() => useCylinderStore());
      
      act(() => {
        result.current.completeLesson('concept');
        result.current.completeLesson('net');
        result.current.setRadius(3);
      });
      
      expect(result.current.completedLessons).toHaveLength(2);
      expect(result.current.interactionCount).toBeGreaterThan(0);
      
      act(() => {
        result.current.resetProgress();
      });
      
      expect(result.current.completedLessons).toEqual([]);
      expect(result.current.interactionCount).toBe(0);
    });
  });

  describe('Interaction Tracking', () => {
    it('should increment interaction count on parameter changes', () => {
      const { result } = renderHook(() => useCylinderStore());
      
      expect(result.current.interactionCount).toBe(0);
      
      act(() => {
        result.current.setRadius(2);
      });
      
      expect(result.current.interactionCount).toBe(1);
      
      act(() => {
        result.current.setHeight(3);
      });
      
      expect(result.current.interactionCount).toBe(2);
    });

    it('should increment interaction count on toggle actions', () => {
      const { result } = renderHook(() => useCylinderStore());
      
      act(() => {
        result.current.toggleWireframe();
        result.current.toggleNet();
        result.current.setAnimating(true);
      });
      
      expect(result.current.interactionCount).toBe(3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero radius', () => {
      const { result } = renderHook(() => useCylinderStore());
      
      act(() => {
        result.current.setRadius(0);
        result.current.setHeight(5);
      });
      
      expect(result.current.volume).toBe(0);
      expect(result.current.surfaceArea).toBe(0);
    });

    it('should handle zero height', () => {
      const { result } = renderHook(() => useCylinderStore());
      
      act(() => {
        result.current.setRadius(2);
        result.current.setHeight(0);
      });
      
      expect(result.current.volume).toBe(0);
      // Surface area should still have the circular bases
      expect(result.current.surfaceArea).toBeCloseTo(25.133, 2); // 2π × 2²
    });

    it('should handle very large values', () => {
      const { result } = renderHook(() => useCylinderStore());
      
      act(() => {
        result.current.setRadius(1000);
        result.current.setHeight(1000);
      });
      
      expect(result.current.volume).toBeCloseTo(3141592653.59, 0);
      expect(result.current.surfaceArea).toBeCloseTo(12566370.614, 0);
    });
  });
});
