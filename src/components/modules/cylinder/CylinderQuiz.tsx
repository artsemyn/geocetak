import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  LinearProgress,
  Chip,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Grid,
  Paper,
} from '@mui/material';
import {
  ExpandMore,
  Lightbulb,
  Timer,
  CheckCircle,
  Cancel,
  Star,
} from '@mui/icons-material';
import { useQuizStore, QuizQuestion } from '../../../stores/quizStore';
import { useUserStore } from '../../../stores/userStore';
import { useCylinderStore } from '../../../stores/cylinderStore';

// Sample questions untuk cylinder
const cylinderQuestions: QuizQuestion[] = [
  {
    id: 'cyl-1',
    type: 'multiple-choice',
    question: 'Rumus volume tabung yang benar adalah...',
    options: ['π × r × t', 'π × r² × t', '2π × r × t', 'π × r² × t²'],
    correctAnswer: 'π × r² × t',
    explanation: 'Volume tabung = Luas alas × tinggi = π × r² × t',
    difficulty: 'easy',
    xpReward: 10,
    hints: ['Volume = Luas alas × tinggi', 'Luas lingkaran = π × r²']
  },
  {
    id: 'cyl-2',
    type: 'calculation',
    question: 'Sebuah tabung memiliki jari-jari 3 cm dan tinggi 5 cm. Berapa volume tabung tersebut? (gunakan π = 3.14)',
    correctAnswer: 141.3,
    explanation: 'V = π × r² × t = 3.14 × 3² × 5 = 3.14 × 9 × 5 = 141.3 cm³',
    difficulty: 'medium',
    xpReward: 15,
    hints: ['V = π × r² × t', 'r = 3 cm, t = 5 cm, π = 3.14']
  },
  {
    id: 'cyl-3',
    type: 'multiple-choice',
    question: 'Jaring-jaring tabung terdiri dari...',
    options: [
      '2 lingkaran dan 1 persegi panjang',
      '1 lingkaran dan 1 persegi panjang', 
      '2 lingkaran dan 2 persegi panjang',
      '3 lingkaran'
    ],
    correctAnswer: '2 lingkaran dan 1 persegi panjang',
    explanation: 'Jaring-jaring tabung = 2 lingkaran (alas + tutup) + 1 persegi panjang (selimut)',
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'cyl-4',
    type: 'interactive',
    question: 'Gunakan kontrol di sebelah untuk membuat tabung dengan volume sekitar 50 unit³. Berapa kombinasi r dan t yang tepat?',
    correctAnswer: 'various', // Will be checked dynamically
    explanation: 'Berbagai kombinasi r dan t bisa menghasilkan volume ~50, misalnya r=2, t=4 atau r=1.5, t=7',
    difficulty: 'hard',
    xpReward: 25,
  }
];

const CylinderQuiz: React.FC = () => {
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    score,
    isCompleted,
    showResults,
    timeRemaining,
    hintsUsed,
    setQuestions,
    nextQuestion,
    previousQuestion,
    submitAnswer,
    completeQuiz,
    resetQuiz,
    useHint,
    updateTimer,
  } = useQuizStore();

  const { addXP } = useUserStore();
  const { volume } = useCylinderStore();
  
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [calculationAnswer, setCalculationAnswer] = useState<string>('');
  const [showHint, setShowHint] = useState(false);

  // Initialize questions
  useEffect(() => {
    if (questions.length === 0) {
      setQuestions(cylinderQuestions);
    }
  }, [setQuestions, questions.length]);

  // Timer countdown
  useEffect(() => {
    if (!isCompleted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        updateTimer(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isCompleted) {
      completeQuiz();
    }
  }, [timeRemaining, isCompleted, updateTimer, completeQuiz]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSubmit = () => {
    let answer: string | number = '';
    
    if (currentQuestion.type === 'multiple-choice') {
      answer = selectedAnswer;
    } else if (currentQuestion.type === 'calculation') {
      answer = parseFloat(calculationAnswer);
    } else if (currentQuestion.type === 'interactive') {
      // Check if volume is close to 50
      answer = Math.abs(volume - 50) < 5 ? 'correct' : 'incorrect';
    }
    
    submitAnswer(answer);
    
    // Move to next question or complete quiz
    if (currentQuestionIndex === questions.length - 1) {
      completeQuiz();
      addXP(score);
    } else {
      setTimeout(() => {
        nextQuestion();
        setSelectedAnswer('');
        setCalculationAnswer('');
        setShowHint(false);
      }, 1500);
    }
  };

  const handleHint = () => {
    useHint();
    setShowHint(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isAnswerCorrect = (questionIndex: number) => {
    const userAnswer = userAnswers[questionIndex];
    const correctAnswer = questions[questionIndex]?.correctAnswer;
    
    if (questions[questionIndex]?.type === 'calculation') {
      return Math.abs(Number(userAnswer) - Number(correctAnswer)) < 0.1;
    }
    return userAnswer === correctAnswer;
  };

  if (questions.length === 0) {
    return <Typography>Loading quiz...</Typography>;
  }

  // Results screen
  if (showResults) {
    const correctCount = userAnswers.filter((_, index) => isAnswerCorrect(index)).length;
    const accuracy = Math.round((correctCount / questions.length) * 100);
    
    return (
      <Card>
        <CardContent>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              🎉 Quiz Selesai!
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              Skor: {score} XP
            </Typography>
            <Typography variant="body1">
              Benar: {correctCount}/{questions.length} ({accuracy}%)
            </Typography>
          </Box>

          {/* Results breakdown */}
          <Box sx={{ mb: 3 }}>
            {questions.map((question, index) => (
              <Paper key={question.id} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {isAnswerCorrect(index) ? (
                    <CheckCircle color="success" sx={{ mr: 1 }} />
                  ) : (
                    <Cancel color="error" sx={{ mr: 1 }} />
                  )}
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {question.question}
                  </Typography>
                  <Chip
                    label={`+${question.xpReward} XP`}
                    size="small"
                    color={isAnswerCorrect(index) ? "success" : "default"}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {question.explanation}
                </Typography>
              </Paper>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="outlined" onClick={resetQuiz}>
              Ulangi Quiz
            </Button>
            <Button variant="contained" onClick={() => window.location.reload()}>
              Lanjut Pembelajaran
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Quiz Tabung - Soal {currentQuestionIndex + 1}/{questions.length}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Timer color="primary" />
            <Typography variant="body2" color="primary">
              {formatTime(timeRemaining)}
            </Typography>
          </Box>
        </Box>

        {/* Progress */}
        <Box sx={{ mb: 3 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Progress: {Math.round(progress)}% | Skor: {score} XP
          </Typography>
        </Box>

        {/* Question */}
        <Typography variant="h6" gutterBottom>
          {currentQuestion.question}
        </Typography>

        {/* Difficulty & Reward */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <Chip 
            label={currentQuestion.difficulty} 
            size="small"
            color={currentQuestion.difficulty === 'easy' ? 'success' : 
                   currentQuestion.difficulty === 'medium' ? 'warning' : 'error'}
          />
          <Chip 
            label={`+${currentQuestion.xpReward} XP`} 
            size="small" 
            color="primary"
            icon={<Star />}
          />
        </Box>

        {/* Answer Input */}
        {currentQuestion.type === 'multiple-choice' && (
          <RadioGroup
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          >
            {currentQuestion.options?.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        )}

        {currentQuestion.type === 'calculation' && (
          <TextField
            fullWidth
            label="Masukkan jawaban Anda"
            type="number"
            value={calculationAnswer}
            onChange={(e) => setCalculationAnswer(e.target.value)}
            placeholder="Contoh: 141.3"
            sx={{ mb: 2 }}
          />
        )}

        {currentQuestion.type === 'interactive' && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Gunakan kontrol parameter di sebelah kanan untuk mengatur tabung agar volumenya mendekati 50 unit³!
            Volume saat ini: {volume.toFixed(2)} unit³
          </Alert>
        )}

        {/* Hint Section */}
        {currentQuestion.hints && (
          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Lightbulb sx={{ mr: 1, color: 'orange' }} />
                <Typography>Hint ({hintsUsed} digunakan)</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {showHint ? (
                <Box>
                  {currentQuestion.hints.map((hint, index) => (
                    <Typography key={index} variant="body2" gutterBottom>
                      💡 {hint}
                    </Typography>
                  ))}
                </Box>
              ) : (
                <Button onClick={handleHint} size="small">
                  Tampilkan Hint
                </Button>
              )}
            </AccordionDetails>
          </Accordion>
        )}

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button 
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outlined"
          >
            Sebelumnya
          </Button>
          
          <Button 
            onClick={handleAnswerSubmit}
            disabled={
              (currentQuestion.type === 'multiple-choice' && !selectedAnswer) ||
              (currentQuestion.type === 'calculation' && !calculationAnswer) ||
              (currentQuestion.type === 'interactive' && Math.abs(volume - 50) >= 5)
            }
            variant="contained"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Selesai' : 'Jawab & Lanjut'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CylinderQuiz;