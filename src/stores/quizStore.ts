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
  // Current quiz state
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
  // Initial state
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  score: 0,
  isCompleted: false,
  showResults: false,
  timeRemaining: 600, // 10 minutes
  hintsUsed: 0,
  
  // Actions
  setQuestions: (questions) => {
    set({ 
      questions,
      userAnswers: new Array(questions.length).fill(''),
      timeRemaining: 600,
      currentQuestionIndex: 0,
      score: 0,
      isCompleted: false,
      showResults: false,
      hintsUsed: 0
    });
  },
  
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
    const { 
      currentQuestionIndex, 
      userAnswers, 
      questions, 
      score 
    } = get();
    
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    
    // Check if answer is correct
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;
    
    if (currentQuestion.type === 'calculation') {
      isCorrect = Math.abs(Number(answer) - Number(currentQuestion.correctAnswer)) < 0.1;
    } else if (currentQuestion.type === 'interactive') {
      isCorrect = answer === 'correct';
    } else {
      isCorrect = answer === currentQuestion.correctAnswer;
    }
    
    const newScore = isCorrect ? score + currentQuestion.xpReward : score;
    
    set({ 
      userAnswers: newAnswers,
      score: newScore
    });
  },
  
  completeQuiz: () => {
    set({ 
      isCompleted: true,
      showResults: true 
    });
  },
  
  resetQuiz: () => {
    const { questions } = get();
    set({
      currentQuestionIndex: 0,
      userAnswers: new Array(questions.length).fill(''),
      score: 0,
      isCompleted: false,
      showResults: false,
      timeRemaining: 600,
      hintsUsed: 0
    });
  },
  
  useHint: () => {
    set((state) => ({ hintsUsed: state.hintsUsed + 1 }));
  },
  
  updateTimer: (time) => {
    set({ timeRemaining: time });
  },
}));