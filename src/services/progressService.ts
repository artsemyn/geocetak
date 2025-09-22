// src/services/progressService.ts
import { supabase } from './supabase';

export interface UserProgress {
  user_id: string;
  module_id: string;
  completed_lessons: string[];
  xp_earned: number;
  completion_percentage: number;
  last_accessed: string;
  time_spent: number; // dalam detik
}

export interface LearningSession {
  user_id: string;
  module_id: string;
  lesson_id: string;
  start_time: string;
  end_time?: string;
  interactions: number;
  parameters_changed: any[];
}

class ProgressService {
  // Simpan progress user ke database
  async saveProgress(progress: Partial<UserProgress>): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          ...progress,
          last_accessed: new Date().toISOString(),
        });

      if (error) throw error;
    } catch (err) {
      console.error('Error saving progress:', err);
      throw err;
    }
  }

  // Ambil progress user dari database
  async getProgress(userId: string, moduleId?: string): Promise<UserProgress[]> {
    try {
      let query = supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);

      if (moduleId) {
        query = query.eq('module_id', moduleId);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data || [];
    } catch (err) {
      console.error('Error fetching progress:', err);
      return [];
    }
  }

  // Mulai sesi pembelajaran
  async startLearningSession(session: Omit<LearningSession, 'end_time' | 'interactions'>): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('learning_sessions')
        .insert({
          ...session,
          start_time: new Date().toISOString(),
          interactions: 0,
        })
        .select('id')
        .single();

      if (error) {
        console.warn('Database not available, using local session:', error.message);
        // Return a mock ID for development
        return `local-session-${Date.now()}`;
      }
      return data.id;
    } catch (err) {
      console.warn('Error starting session, falling back to local:', err);
      // Fallback to local session ID
      return `local-session-${Date.now()}`;
    }
  }

  // Akhiri sesi pembelajaran
  async endLearningSession(sessionId: string, interactions: number): Promise<void> {
    try {
      // Skip database operations for local sessions
      if (sessionId.startsWith('local-session-')) {
        console.log('Local session ended:', sessionId, 'interactions:', interactions);
        return;
      }

      const { error } = await supabase
        .from('learning_sessions')
        .update({
          end_time: new Date().toISOString(),
          interactions,
        })
        .eq('id', sessionId);

      if (error) {
        console.warn('Error ending session, but continuing:', error.message);
        return;
      }
    } catch (err) {
      console.warn('Error ending session, but continuing:', err);
    }
  }

  // Analitik pembelajaran
  async getLearningAnalytics(userId: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('learning_sessions')
        .select(`
          *,
          user_progress(*)
        `)
        .eq('user_id', userId);

      if (error) throw error;

      // Hitung statistik
      const totalSessions = data?.length || 0;
      const totalTimeSpent = data?.reduce((acc, session) => {
        if (session.start_time && session.end_time) {
          const duration = new Date(session.end_time).getTime() - new Date(session.start_time).getTime();
          return acc + duration;
        }
        return acc;
      }, 0) || 0;

      const averageSessionTime = totalSessions > 0 ? totalTimeSpent / totalSessions : 0;

      return {
        totalSessions,
        totalTimeSpent: Math.round(totalTimeSpent / 1000), // dalam detik
        averageSessionTime: Math.round(averageSessionTime / 1000),
        sessionsData: data,
      };
    } catch (err) {
      console.error('Error fetching analytics:', err);
      return null;
    }
  }
}

export const progressService = new ProgressService();
