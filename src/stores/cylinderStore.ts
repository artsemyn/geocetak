import { create } from 'zustand';

interface CylinderState {
  // Parameters
  radius: number;
  height: number;
  
  // Display options
  showWireframe: boolean;
  showNet: boolean;
  showFormula: boolean;
  isAnimating: boolean;
  
  // Calculated values
  volume: number;
  surfaceArea: number;
  
  // Progress tracking
  completedLessons: string[];
  
  // Actions
  setRadius: (radius: number) => void;
  setHeight: (height: number) => void;
  toggleWireframe: () => void;
  toggleNet: () => void;
  toggleFormula: () => void;
  setAnimating: (isAnimating: boolean) => void;
  calculateValues: () => void;
  completeLesson: (lessonId: string) => void;
  resetProgress: () => void;
}

export const useCylinderStore = create<CylinderState>((set, get) => ({
  // Initial state
  radius: 1,
  height: 2,
  showWireframe: false,
  showNet: false,
  showFormula: false,
  isAnimating: false,
  volume: 0,
  surfaceArea: 0,
  completedLessons: [],
  
  // Actions
  setRadius: (radius) => {
    set({ radius });
    get().calculateValues();
  },
  
  setHeight: (height) => {
    set({ height });
    get().calculateValues();
  },
  
  toggleWireframe: () => set((state) => ({ 
    showWireframe: !state.showWireframe 
  })),
  
  toggleNet: () => set((state) => ({ 
    showNet: !state.showNet 
  })),
  
  toggleFormula: () => set((state) => ({ 
    showFormula: !state.showFormula 
  })),
  
  setAnimating: (isAnimating) => set({ isAnimating }),
  
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
  
  resetProgress: () => set({ completedLessons: [] }),
}));