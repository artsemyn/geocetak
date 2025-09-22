// src/types/index.ts

// Tipe untuk User Store
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
  
  // Tipe untuk Modul Pembelajaran
  export interface SubLesson {
    id: string;
    title: string;
    type: 'concept' | 'interactive' | 'formula' | 'quiz' | 'project';
    duration: number;
    isCompleted: boolean;
    description: string;
  }
  
  export interface Module {
    id: string;
    title: string;
    description: string;
    icon: string;
    isAvailable: boolean;
    isCompleted: boolean;
    progress: number;
    estimatedTime: string;
    xpReward: number;
    difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
    prerequisites: string[];
    learningObjectives: string[];
    subLessons: SubLesson[];
  }
  
  // Tipe untuk Latihan Esai
  export interface EssayQuestion {
    id: string;
    module: string;
    question: string;
    context?: string;
    rubric: { understanding: number; explanation: number; calculation: number; conclusion: number; };
    maxScore: number;
    timeLimit: number; // dalam menit
    difficulty: 'easy' | 'medium' | 'hard';
    xpReward: number;
  }
  
  export interface EssayEvaluation {
    questionId: string;
    question: string;
    answer: string;
    rubric: { understanding: number; explanation: number; calculation: number; conclusion: number; };
    maxScore: number;
  }
  
  export interface EvaluationResult {
    scores: { understanding: number; explanation: number; calculation: number; conclusion: number; };
    totalScore: number;
    percentage: number;
    maxScore: number;
    feedback: string;
    suggestions: string[];
    earnedXP: number;
  }
  