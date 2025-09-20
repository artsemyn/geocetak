import { create } from 'zustand';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}

interface UserState {
  profile: Profile | null;
  xp: number;
  level: number;
  badges: Badge[];
  currentStreak: number;
  
  // Actions
  setProfile: (profile: Profile | null) => void;
  addXP: (amount: number) => void;
  addBadge: (badge: Badge) => void;
  updateStreak: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: { id: '1', email: 'user@example.com', full_name: 'Demo User' },
  xp: 150,
  level: 1,
  badges: [],
  currentStreak: 3,
  
  setProfile: (profile) => set({ profile }),
  
  addXP: (amount) => {
    const currentXP = get().xp;
    const newXP = currentXP + amount;
    const newLevel = Math.floor(newXP / 100) + 1;
    
    set({ xp: newXP, level: newLevel });
  },
  
  addBadge: (badge) => {
    const currentBadges = get().badges;
    if (!currentBadges.find(b => b.id === badge.id)) {
      set({ badges: [...currentBadges, badge] });
    }
  },
  
  updateStreak: () => {
    const current = get().currentStreak;
    set({ currentStreak: current + 1 });
  },
}));