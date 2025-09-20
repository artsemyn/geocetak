import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useEssayStore } from '../essayStore';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock environment variables
const originalEnv = process.env;

describe('essayStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useEssayStore.setState({
      isEvaluating: false,
      lastEvaluation: null,
      evaluationHistory: [],
    });

    // Reset mocks
    mockFetch.mockClear();
    vi.restoreAllMocks();

    // Set up environment variables for testing
    process.env = {
      ...originalEnv,
      NODE_ENV: 'development',
      REACT_APP_SUPABASE_URL: 'https://test-project.supabase.co',
      REACT_APP_SUPABASE_ANON_KEY: 'test-anon-key',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = useEssayStore.getState();
      expect(state.isEvaluating).toBe(false);
      expect(state.lastEvaluation).toBeNull();
      expect(state.evaluationHistory).toEqual([]);
    });
  });

  describe('evaluateEssay', () => {
    const mockEvaluation = {
      questionId: 'test-question-1',
      question: 'Jelaskan rumus volume tabung dan cara menurunkannya',
      answer: 'Volume tabung adalah V = π × r² × t. Rumus ini diperoleh dari luas alas lingkaran dikalikan tinggi.',
      rubric: {
        understanding: 25,
        explanation: 25,
        calculation: 25,
        conclusion: 25,
      },
      maxScore: 100,
    };

    it('should evaluate essay successfully in development mode', async () => {
      const result = await useEssayStore.getState().evaluateEssay(mockEvaluation);

      expect(result).toMatchObject({
        scores: expect.objectContaining({
          understanding: expect.any(Number),
          explanation: expect.any(Number),
          calculation: expect.any(Number),
          conclusion: expect.any(Number),
        }),
        totalScore: expect.any(Number),
        percentage: expect.any(Number),
        maxScore: 100,
        feedback: expect.any(String),
        suggestions: expect.any(Array),
        earnedXP: expect.any(Number),
        evaluatedAt: expect.any(String),
      });

      // Check if scores are within valid range (0-25)
      Object.values(result.scores).forEach(score => {
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(25);
      });

      // Check if state was updated correctly
      const state = useEssayStore.getState();
      expect(state.isEvaluating).toBe(false);
      expect(state.lastEvaluation).toEqual(result);
      expect(state.evaluationHistory).toHaveLength(1);
      expect(state.evaluationHistory[0]).toEqual(result);
    });

    it('should set isEvaluating to true during evaluation', async () => {
      const evaluationPromise = useEssayStore.getState().evaluateEssay(mockEvaluation);

      // Check that isEvaluating is true immediately after calling
      expect(useEssayStore.getState().isEvaluating).toBe(true);

      await evaluationPromise;

      // Check that isEvaluating is false after completion
      expect(useEssayStore.getState().isEvaluating).toBe(false);
    });

    it('should calculate XP correctly based on percentage', async () => {
      const result = await useEssayStore.getState().evaluateEssay(mockEvaluation);
      const expectedXP = Math.round(mockEvaluation.maxScore * 0.5); // Assuming high score (90%+)

      expect(result.earnedXP).toBeGreaterThan(0);
      expect(result.earnedXP).toBeLessThanOrEqual(expectedXP);
    });

    it('should add multiple evaluations to history', async () => {
      await useEssayStore.getState().evaluateEssay(mockEvaluation);
      await useEssayStore.getState().evaluateEssay({
        ...mockEvaluation,
        questionId: 'test-question-2',
      });

      const state = useEssayStore.getState();
      expect(state.evaluationHistory).toHaveLength(2);
    }, 10000);

    it('should handle production mode with Supabase API call', async () => {
      process.env.NODE_ENV = 'production';

      const mockApiResponse = {
        result: JSON.stringify({
          scores: { understanding: 20, explanation: 18, calculation: 22, conclusion: 19 },
          feedback: 'Great work!',
          suggestions: ['Keep it up', 'Add more examples'],
        }),
        tokensUsed: 150,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      });

      const result = await useEssayStore.getState().evaluateEssay(mockEvaluation);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://test-project.supabase.co/functions/v1/evaluate-essay',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-anon-key',
          }),
          body: expect.any(String),
        })
      );

      expect(result.scores).toEqual({
        understanding: 20,
        explanation: 18,
        calculation: 22,
        conclusion: 19,
      });
    });

    it('should handle API errors in production mode', async () => {
      process.env.NODE_ENV = 'production';

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: () => Promise.resolve('Internal Server Error'),
      });

      await expect(
        useEssayStore.getState().evaluateEssay(mockEvaluation)
      ).rejects.toThrow('API Error 500: Internal Server Error');

      expect(useEssayStore.getState().isEvaluating).toBe(false);
    });

    it('should handle malformed API response', async () => {
      process.env.NODE_ENV = 'production';

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          error: 'Invalid response format from AI model',
          rawResponse: 'Not valid JSON',
        }),
      });

      await expect(
        useEssayStore.getState().evaluateEssay(mockEvaluation)
      ).rejects.toThrow('Invalid response format from AI model');
    });
  });

  describe('clearHistory', () => {
    it('should clear evaluation history and last evaluation', async () => {
      // Add some evaluations first
      await useEssayStore.getState().evaluateEssay({
        questionId: 'test-1',
        question: 'Test question',
        answer: 'Test answer',
        rubric: { understanding: 25, explanation: 25, calculation: 25, conclusion: 25 },
        maxScore: 100,
      });

      expect(useEssayStore.getState().evaluationHistory).toHaveLength(1);
      expect(useEssayStore.getState().lastEvaluation).not.toBeNull();

      // Clear history
      useEssayStore.getState().clearHistory();

      const state = useEssayStore.getState();
      expect(state.evaluationHistory).toEqual([]);
      expect(state.lastEvaluation).toBeNull();
    });
  });

  describe('getAverageScore', () => {
    it('should return 0 for empty history', () => {
      const average = useEssayStore.getState().getAverageScore();
      expect(average).toBe(0);
    });

    it('should calculate correct average for multiple evaluations', async () => {
      const mockEvaluation = {
        questionId: 'test-1',
        question: 'Test question',
        answer: 'Test answer',
        rubric: { understanding: 25, explanation: 25, calculation: 25, conclusion: 25 },
        maxScore: 100,
      };

      await useEssayStore.getState().evaluateEssay(mockEvaluation);
      await useEssayStore.getState().evaluateEssay({
        ...mockEvaluation,
        questionId: 'test-2',
      });

      const average = useEssayStore.getState().getAverageScore();
      expect(average).toBeGreaterThan(0);
      expect(average).toBeLessThanOrEqual(100);
    }, 10000);
  });

  describe('XP calculation', () => {
    it('should calculate XP based on percentage ranges', () => {
      const testCases = [
        { percentage: 95, expectedMultiplier: 0.5 },
        { percentage: 85, expectedMultiplier: 0.4 },
        { percentage: 75, expectedMultiplier: 0.3 },
        { percentage: 65, expectedMultiplier: 0.2 },
        { percentage: 55, expectedMultiplier: 0.1 },
      ];

      testCases.forEach(({ percentage, expectedMultiplier }) => {
        const maxScore = 100;
        let earnedXP = 0;

        if (percentage >= 90) earnedXP = Math.round(maxScore * 0.5);
        else if (percentage >= 80) earnedXP = Math.round(maxScore * 0.4);
        else if (percentage >= 70) earnedXP = Math.round(maxScore * 0.3);
        else if (percentage >= 60) earnedXP = Math.round(maxScore * 0.2);
        else earnedXP = Math.round(maxScore * 0.1);

        const expectedXP = Math.round(maxScore * expectedMultiplier);
        expect(earnedXP).toBe(expectedXP);
      });
    });
  });
});