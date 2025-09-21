import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

interface UserState {
  // User data
  profile: UserProfile | null;
  xp: number;
  level: number;
  badges: Badge[];
  
  // Progress tracking
  completedModules: string[];
  currentModule: string | null;
  totalStudyTime: number; // in minutes
  
  // Actions
  setProfile: (profile: UserProfile) => void;
  addXP: (amount: number) => void;
  addBadge: (badge: Badge) => void;
  completeModule: (moduleId: string) => void;
  setCurrentModule: (moduleId: string) => void;
  addStudyTime: (minutes: number) => void;
  calculateLevel: () => void;
  resetProgress: () => void;
}

const calculateLevelFromXP = (xp: number): number => {
  return Math.floor(xp / 100) + 1;
};

const predefinedBadges: { [key: string]: Badge } = {
  'first_lesson': {
    id: 'first_lesson',
    name: 'First Steps',
    description: 'Menyelesaikan pelajaran pertama',
    icon: '🎯',
    earnedAt: ''
  },
  'cylinder_master': {
    id: 'cylinder_master',
    name: 'Cylinder Master',
    description: 'Menguasai semua materi tabung',
    icon: '🏆',
    earnedAt: ''
  },
  'quiz_champion': {
    id: 'quiz_champion',
    name: 'Quiz Champion',
    description: 'Lulus quiz dengan skor sempurna',
    icon: '🏅',
    earnedAt: ''
  },
  'formula_expert': {
    id: 'formula_expert',
    name: 'Formula Expert',
    description: 'Memahami derivasi rumus tabung',
    icon: '🧮',
    earnedAt: ''
  }
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
      profile: {
        id: 'demo-user',
        name: 'Demo User',
        email: 'demo@geocetak.com',
        createdAt: new Date().toISOString()
      },
      xp: 150,
      level: 2,
      badges: [],
      completedModules: [],
      currentModule: null,
      totalStudyTime: 0,
      
      // Actions
      setProfile: (profile) => {
        set({ profile });
      },
      
      addXP: (amount) => {
        const { xp } = get();
        const newXP = xp + amount;
        const newLevel = calculateLevelFromXP(newXP);
        
        set({ 
          xp: newXP,
          level: newLevel
        });
        
        // Check for level-based badges
        if (newLevel >= 5 && !get().badges.find(b => b.id === 'level_5')) {
          get().addBadge({
            id: 'level_5',
            name: 'Level Master',
            description: 'Mencapai level 5',
            icon: '⭐',
            earnedAt: new Date().toISOString()
          });
        }
      },
      
      addBadge: (badge) => {
        const { badges } = get();
        if (!badges.find(b => b.id === badge.id)) {
          set({ 
            badges: [...badges, { ...badge, earnedAt: new Date().toISOString() }]
          });
        }
      },
      
      completeModule: (moduleId) => {
        const { completedModules } = get();
        if (!completedModules.includes(moduleId)) {
          set({ 
            completedModules: [...completedModules, moduleId]
          });
          
          // Award badges based on module completion
          if (moduleId === 'cylinder') {
            get().addBadge(predefinedBadges.cylinder_master);
          }
        }
      },
      
      setCurrentModule: (moduleId) => {
        set({ currentModule: moduleId });
      },
      
      addStudyTime: (minutes) => {
        const { totalStudyTime } = get();
        set({ totalStudyTime: totalStudyTime + minutes });
      },
      
      calculateLevel: () => {
        const { xp } = get();
        const newLevel = calculateLevelFromXP(xp);
        set({ level: newLevel });
      },
      
      resetProgress: () => {
        set({
          xp: 0,
          level: 1,
          badges: [],
          completedModules: [],
          currentModule: null,
          totalStudyTime: 0
        });
      },
    }),
    {
      name: 'geocetak-user-storage', // unique name for localStorage
      partialize: (state) => ({
        profile: state.profile,
        xp: state.xp,
        level: state.level,
        badges: state.badges,
        completedModules: state.completedModules,
        totalStudyTime: state.totalStudyTime,
      }),
    }
  )
);