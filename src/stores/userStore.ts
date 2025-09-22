// src/stores/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, Badge } from '../types';
import { progressService } from '../services/progressService';

interface UserState {
  profile: UserProfile | null;
  xp: number;
  level: number;
  badges: Badge[];
  completedModules: string[];
  currentSessionId: string | null;
  setProfile: (profile: UserProfile) => void;
  addXP: (amount: number) => void;
  addBadge: (badge: Badge) => void;
  completeModule: (moduleId: string) => void;
  startLearningSession: (moduleId: string, lessonId: string) => Promise<void>;
  endLearningSession: (interactions: number) => Promise<void>;
  syncProgress: () => Promise<void>;
}

const calculateLevelFromXP = (xp: number): number => Math.floor(xp / 100) + 1;

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: { id: 'demo-user', name: 'Siswa Cerdas', email: 'siswa@geocetak.com', createdAt: new Date().toISOString() },
      xp: 150,
      level: 2,
      badges: [],
      completedModules: [],
      currentSessionId: null,
      setProfile: (profile) => set({ profile }),
      addXP: (amount) => {
        set((state) => {
          const newXP = state.xp + amount;
          return { xp: newXP, level: calculateLevelFromXP(newXP) };
        });
        // Sync progress setelah XP berubah
        get().syncProgress();
      },
      addBadge: (badge) => {
        set((state) => {
          if (!state.badges.find(b => b.id === badge.id)) {
            return { badges: [...state.badges, { ...badge, earnedAt: new Date().toISOString() }] };
          }
          return {};
        });
      },
      completeModule: (moduleId) => {
        set((state) => {
          if (!state.completedModules.includes(moduleId)) {
            return { completedModules: [...state.completedModules, moduleId] };
          }
          return {};
        });
      },
      startLearningSession: async (moduleId: string, lessonId: string) => {
        try {
          const { profile } = get();
          if (profile) {
            const sessionId = await progressService.startLearningSession({
              user_id: profile.id,
              module_id: moduleId,
              lesson_id: lessonId,
              start_time: new Date().toISOString(),
              parameters_changed: [],
            });
            set({ currentSessionId: sessionId });
          }
        } catch (error) {
          console.warn('Failed to start learning session, continuing with local session:', error);
          // Set a local session ID as fallback
          set({ currentSessionId: `local-session-${Date.now()}` });
        }
      },
      endLearningSession: async (interactions: number) => {
        try {
          const { currentSessionId } = get();
          if (currentSessionId) {
            await progressService.endLearningSession(currentSessionId, interactions);
            set({ currentSessionId: null });
          }
        } catch (error) {
          console.error('Failed to end learning session:', error);
        }
      },
      syncProgress: async () => {
        try {
          const { profile, xp, completedModules } = get();
          if (profile) {
            await progressService.saveProgress({
              user_id: profile.id,
              module_id: 'cylinder', // Untuk sekarang hardcode, nanti bisa dynamic
              completed_lessons: completedModules,
              xp_earned: xp,
              completion_percentage: Math.min((completedModules.length / 4) * 100, 100),
              time_spent: 0, // Akan dihitung dari learning sessions
            });
          }
        } catch (error) {
          console.error('Failed to sync progress:', error);
        }
      },
    }),
    {
      name: 'geocetak-user-storage',
    }
  )
);
