import { create } from 'zustand';

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'calculation' | 'interactive';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  hints?: string[];
}

interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  userAnswers: (string | number)[];
  score: number;
  isCompleted: boolean;
  showResults: boolean;
  timeRemaining: number;
  hintsUsed: number;
  
  // Actions
  setQuestions: (questions: QuizQuestion[]) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitAnswer: (answer: string | number) => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
  useHint: () => void;
  updateTimer: (time: number) => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  score: 0,
  isCompleted: false,
  showResults: false,
  timeRemaining: 300, // 5 minutes
  hintsUsed: 0,
  
  setQuestions: (questions) => set({ 
    questions, 
    userAnswers: new Array(questions.length).fill(null),
    currentQuestionIndex: 0,
    score: 0,
    isCompleted: false,
    showResults: false,
    hintsUsed: 0
  }),
  
  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  },
  
  previousQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex > 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 });
    }
  },
  
  submitAnswer: (answer) => {
    const { currentQuestionIndex, userAnswers, questions } = get();
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    
    // Calculate score
    const correct = questions[currentQuestionIndex].correctAnswer;
    const isCorrect = answer === correct;
    const currentScore = get().score;
    const newScore = isCorrect ? currentScore + questions[currentQuestionIndex].xpReward : currentScore;
    
    set({ 
      userAnswers: newAnswers,
      score: newScore
    });
  },
  
  completeQuiz: () => set({ isCompleted: true, showResults: true }),
  
  resetQuiz: () => set({
    currentQuestionIndex: 0,
    userAnswers: [],
    score: 0,
    isCompleted: false,
    showResults: false,
    timeRemaining: 300,
    hintsUsed: 0
  }),
  
  useHint: () => {
    const hints = get().hintsUsed;
    set({ hintsUsed: hints + 1 });
  },
  
  updateTimer: (time) => set({ timeRemaining: time }),
}));