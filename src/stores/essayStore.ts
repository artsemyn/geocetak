import { create } from 'zustand';

interface EssayEvaluation {
  questionId: string;
  question: string;
  answer: string;
  rubric: {
    understanding: number;
    explanation: number;
    calculation: number;
    conclusion: number;
  };
  maxScore: number;
}

interface EvaluationResult {
  scores: {
    understanding: number;
    explanation: number;
    calculation: number;
    conclusion: number;
  };
  totalScore: number;
  percentage: number;
  maxScore: number;
  feedback: string;
  suggestions: string[];
  earnedXP: number;
  evaluatedAt: string;
}

interface EssayState {
  // Current evaluation state
  isEvaluating: boolean;
  lastEvaluation: EvaluationResult | null;
  evaluationHistory: EvaluationResult[];
  
  // Actions
  evaluateEssay: (evaluation: EssayEvaluation) => Promise<EvaluationResult>;
  clearHistory: () => void;
  getAverageScore: () => number;
}

// Gemini AI prompt template
const createEvaluationPrompt = (evaluation: EssayEvaluation): string => {
  return `
Anda adalah seorang tutor matematika ahli yang akan mengevaluasi jawaban essay siswa tentang geometri bangun ruang (tabung/cylinder).

SOAL:
"${evaluation.question}"

JAWABAN SISWA:
"${evaluation.answer}"

KRITERIA PENILAIAN:
1. Pemahaman Konsep (${evaluation.rubric.understanding}%): Seberapa baik siswa memahami konsep dasar tabung
2. Kejelasan Penjelasan (${evaluation.rubric.explanation}%): Seberapa jelas dan terstruktur penjelasan yang diberikan
3. Langkah Matematis (${evaluation.rubric.calculation}%): Ketepatan dan kelengkapan langkah-langkah perhitungan matematis
4. Kesimpulan (${evaluation.rubric.conclusion}%): Kualitas kesimpulan dan aplikasi praktis

INSTRUKSI EVALUASI:
1. Berikan skor untuk setiap kriteria (0-25 poin) berdasarkan persentase bobot di atas
2. Berikan feedback konstruktif yang membantu siswa belajar
3. Sertakan 3-5 saran perbaikan yang spesifik
4. Gunakan bahasa Indonesia yang ramah dan mendorong

FORMAT RESPONS (HARUS DALAM JSON):
{
  "scores": {
    "understanding": [0-25],
    "explanation": [0-25], 
    "calculation": [0-25],
    "conclusion": [0-25]
  },
  "feedback": "Feedback lengkap dalam bahasa Indonesia...",
  "suggestions": [
    "Saran perbaikan 1...",
    "Saran perbaikan 2...",
    "Saran perbaikan 3..."
  ]
}

PENTING: Respons harus HANYA berupa JSON yang valid, tanpa teks tambahan apapun.
`;
};

// Mock Gemini API call (replace with actual Supabase Edge Function)
const callGeminiAPI = async (prompt: string): Promise<any> => {
  // In production, this would call your Supabase Edge Function
  // which then calls Gemini API
  
  // For now, simulate API call with realistic delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Mock response - replace with actual Gemini API call
  const mockResponse = {
    scores: {
      understanding: Math.floor(Math.random() * 10) + 15, // 15-25
      explanation: Math.floor(Math.random() * 8) + 17,    // 17-25  
      calculation: Math.floor(Math.random() * 12) + 13,   // 13-25
      conclusion: Math.floor(Math.random() * 8) + 17      // 17-25
    },
    feedback: "Jawaban Anda menunjukkan pemahaman yang baik tentang konsep tabung. Penjelasan tentang cara menurunkan rumus volume sudah cukup jelas dengan menyebutkan bahwa volume tabung diperoleh dari luas alas dikalikan tinggi. Langkah matematis yang Anda berikan sudah benar, yaitu V = π × r² × t. Namun, akan lebih baik jika Anda menjelaskan lebih detail mengapa rumus luas lingkaran adalah π × r² dan bagaimana konsep ini diterapkan pada tabung. Kesimpulan sudah tepat, tetapi bisa diperkuat dengan contoh aplikasi praktis dalam kehidupan sehari-hari.",
    suggestions: [
      "Tambahkan penjelasan visual atau diagram untuk memperjelas konsep",
      "Berikan contoh numerik konkret untuk memperkuat pemahaman",
      "Jelaskan hubungan antara rumus tabung dengan konsep integral jika sudah mempelajarinya",
      "Sertakan aplikasi praktis rumus volume tabung dalam berbagai bidang"
    ]
  };
  
  return mockResponse;
};

// Actual Gemini API integration through Supabase Edge Function
const callSupabaseEdgeFunction = async (evaluation: EssayEvaluation): Promise<any> => {
  try {
    // Replace YOUR_SUPABASE_URL with your actual Supabase project URL
    const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co';
    
    const response = await fetch(`${SUPABASE_URL}/functions/v1/evaluate-essay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        prompt: createEvaluationPrompt(evaluation),
        maxTokens: 1000,
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return JSON.parse(data.result);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

export const useEssayStore = create<EssayState>((set, get) => ({
  // Initial state
  isEvaluating: false,
  lastEvaluation: null,
  evaluationHistory: [],
  
  // Actions
  evaluateEssay: async (evaluation: EssayEvaluation) => {
    set({ isEvaluating: true });
    
    try {
      // Call Gemini API through Supabase Edge Function
      // Use real API in production, mock for development
      const isDevelopment = process.env.NODE_ENV === 'development';
      const geminiResponse = isDevelopment 
        ? await callGeminiAPI(createEvaluationPrompt(evaluation))
        : await callSupabaseEdgeFunction(evaluation);
      
      // Calculate totals and XP
      const totalScore = Object.values(geminiResponse.scores).reduce((sum: number, score: number) => sum + score, 0);
      const percentage = Math.round((totalScore / evaluation.maxScore) * 100);
      
      // Calculate XP based on performance
      let earnedXP = 0;
      if (percentage >= 90) earnedXP = Math.round(evaluation.maxScore * 0.5); // 50% of max as XP for excellent
      else if (percentage >= 80) earnedXP = Math.round(evaluation.maxScore * 0.4); // 40% for good
      else if (percentage >= 70) earnedXP = Math.round(evaluation.maxScore * 0.3); // 30% for satisfactory
      else if (percentage >= 60) earnedXP = Math.round(evaluation.maxScore * 0.2); // 20% for passing
      else earnedXP = Math.round(evaluation.maxScore * 0.1); // 10% for effort
      
      const result: EvaluationResult = {
        scores: geminiResponse.scores,
        totalScore,
        percentage,
        maxScore: evaluation.maxScore,
        feedback: geminiResponse.feedback,
        suggestions: geminiResponse.suggestions,
        earnedXP,
        evaluatedAt: new Date().toISOString(),
      };
      
      // Update state
      set((state) => ({
        isEvaluating: false,
        lastEvaluation: result,
        evaluationHistory: [...state.evaluationHistory, result],
      }));
      
      return result;
    } catch (error) {
      set({ isEvaluating: false });
      throw error;
    }
  },
  
  clearHistory: () => {
    set({ evaluationHistory: [], lastEvaluation: null });
  },
  
  getAverageScore: () => {
    const { evaluationHistory } = get();
    if (evaluationHistory.length === 0) return 0;
    
    const totalPercentage = evaluationHistory.reduce((sum, evaluation) => sum + evaluation.percentage, 0);
    return Math.round(totalPercentage / evaluationHistory.length);
  },
}));