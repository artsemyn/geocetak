// src/stores/essayStore.ts
// ANGGAP FILE INI SEBAGAI "JEMBATAN" ATAU KONEKTOR
// Logika di sini dipanggil oleh komponen React (frontend),
// kemudian ia akan memanggil Supabase Function (backend).

import { create } from 'zustand';
import { supabase } from '../services/supabase';
import { EssayEvaluation, EvaluationResult } from '../types';

interface EssayState {
  isEvaluating: boolean;
  error: string | null;
  lastEvaluation: EvaluationResult | null;
  evaluateEssay: (evaluation: EssayEvaluation) => Promise<EvaluationResult>;
}

export const useEssayStore = create<EssayState>((set) => ({
  isEvaluating: false,
  error: null,
  lastEvaluation: null,
  evaluateEssay: async (evaluation) => {
    set({ isEvaluating: true, error: null });
    try {
      // --- INILAH TITIK KONEKSINYA ---
      // Memanggil Supabase Edge Function bernama 'evaluate-essay'
      const { data, error } = await supabase.functions.invoke('evaluate-essay', {
        body: {
          question: evaluation.question,
          answer: evaluation.answer,
          rubric: evaluation.rubric,
          max_score: evaluation.maxScore,
        },
      });

      if (error) {
        throw new Error(error.message);
      }
      
      if (!data || !data.result) {
          throw new Error("Respons dari server tidak valid.");
      }

      const result: EvaluationResult = {
        ...data.result,
        earnedXP: 0 // XP akan dihitung di sini
      };

      // Kalkulasi XP berdasarkan persentase skor
      const percentage = result.percentage || 0;
      let earnedXP = 0;
      if (percentage >= 85) earnedXP = Math.round(evaluation.maxScore * 0.5); // 50% XP
      else if (percentage >= 70) earnedXP = Math.round(evaluation.maxScore * 0.3); // 30% XP
      else if (percentage >= 50) earnedXP = Math.round(evaluation.maxScore * 0.2); // 20% XP
      else earnedXP = Math.round(evaluation.maxScore * 0.1); // 10% XP

      result.earnedXP = earnedXP;

      set({ lastEvaluation: result, isEvaluating: false });
      return result;

    } catch (err: any) {
      console.error('Error saat memanggil Supabase Function:', err);
      set({ error: err.message, isEvaluating: false });
      throw err;
    }
  },
}));

