// src/stores/cylinderStore.ts
import { create } from 'zustand';

interface CylinderState {
  radius: number;
  height: number;
  showWireframe: boolean;
  showNet: boolean;
  isAnimating: boolean;
  volume: number;
  surfaceArea: number;
  completedLessons: string[];
  setRadius: (radius: number) => void;
  setHeight: (height: number) => void;
  toggleWireframe: () => void;
  toggleNet: () => void;
  setAnimating: (isAnimating: boolean) => void;
  calculateValues: () => void;
  completeLesson: (lessonId: string) => void;
  resetProgress: () => void;
  interactionCount: number;
  incrementInteraction: () => void;
}

export const useCylinderStore = create<CylinderState>((set, get) => ({
  radius: 1,
  height: 2,
  showWireframe: false,
  showNet: false,
  isAnimating: false,
  volume: 0,
  surfaceArea: 0,
  completedLessons: [],
  interactionCount: 0,
  setRadius: (radius) => { 
    set({ radius }); 
    get().calculateValues(); 
    get().incrementInteraction();
  },
  setHeight: (height) => { 
    set({ height }); 
    get().calculateValues(); 
    get().incrementInteraction();
  },
  toggleWireframe: () => {
    set((state) => ({ showWireframe: !state.showWireframe }));
    get().incrementInteraction();
  },
  toggleNet: () => {
    set((state) => ({ showNet: !state.showNet }));
    get().incrementInteraction();
  },
  setAnimating: (isAnimating) => {
    set({ isAnimating });
    get().incrementInteraction();
  },
  calculateValues: () => {
    const { radius, height } = get();
    const volume = Math.PI * radius * radius * height;
    const surfaceArea = 2 * Math.PI * radius * (radius + height);
    set({ volume, surfaceArea });
  },
  completeLesson: (lessonId) => set((state) => ({
    completedLessons: state.completedLessons.includes(lessonId)
      ? state.completedLessons
      : [...state.completedLessons, lessonId]
  })),
  resetProgress: () => set({ completedLessons: [], interactionCount: 0 }),
  incrementInteraction: () => set((state) => ({ interactionCount: state.interactionCount + 1 })),
}));
