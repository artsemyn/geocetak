// src/data/essayQuestions.ts
import type { EssayQuestion } from '../types';

export const essayQuestions: EssayQuestion[] = [
  {
    id: 'cylinder-essay-1', module: 'cylinder',
    question: 'Jelaskan bagaimana cara menurunkan rumus volume tabung dari konsep dasar geometri. Sertakan langkah-langkah matematis yang jelas!',
    context: 'Tabung adalah bangun ruang yang memiliki alas dan tutup berbentuk lingkaran yang sejajar dan kongruen.',
    rubric: { understanding: 25, explanation: 25, calculation: 25, conclusion: 25 },
    maxScore: 100, timeLimit: 15, difficulty: 'medium', xpReward: 30
  },
  {
    id: 'cylinder-essay-2', module: 'cylinder',
    question: 'Sebuah tangki air berbentuk tabung memiliki diameter 4 meter dan tinggi 6 meter. Hitunglah volume air yang dapat ditampung dan jelaskan aplikasi praktisnya.',
    rubric: { understanding: 20, explanation: 30, calculation: 30, conclusion: 20 },
    maxScore: 100, timeLimit: 20, difficulty: 'hard', xpReward: 40
  },
  {
    id: 'cylinder-essay-3', module: 'cylinder',
    question: 'Bandingkan luas permukaan tabung dengan volume yang sama tetapi proporsi jari-jari dan tinggi yang berbeda. Manakah yang lebih efisien?',
    rubric: { understanding: 30, explanation: 25, calculation: 25, conclusion: 20 },
    maxScore: 100, timeLimit: 25, difficulty: 'hard', xpReward: 45
  }
];
