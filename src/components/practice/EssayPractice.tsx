import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Chip,
  Alert,
  Paper,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  Stack,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  ExpandMore,
  Send,
  Psychology,
  Timer,
  CheckCircle,
  TrendingUp,
  Lightbulb,
  Assignment,
  AutoAwesome,
} from '@mui/icons-material';
import { useEssayStore } from '../stores/essayStore';
import { useUserStore } from '../stores/userStore';

interface EssayQuestion {
  id: string;
  module: string;
  question: string;
  context?: string;
  rubric: {
    understanding: number;
    explanation: number;
    calculation: number;
    conclusion: number;
  };
  maxScore: number;
  timeLimit: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
}

const essayQuestions: EssayQuestion[] = [
  {
    id: 'cylinder-essay-1',
    module: 'cylinder',
    question: 'Jelaskan bagaimana cara menurunkan rumus volume tabung dari konsep dasar geometri. Sertakan langkah-langkah matematis yang jelas!',
    context: 'Tabung adalah bangun ruang yang memiliki alas dan tutup berbentuk lingkaran yang sejajar dan kongruen.',
    rubric: {
      understanding: 25, // Pemahaman konsep
      explanation: 25,   // Kejelasan penjelasan  
      calculation: 25,   // Langkah matematis
      conclusion: 25     // Kesimpulan
    },
    maxScore: 100,
    timeLimit: 15,
    difficulty: 'medium',
    xpReward: 30
  },
  {
    id: 'cylinder-essay-2',
    module: 'cylinder',
    question: 'Sebuah tangki air berbentuk tabung memiliki diameter 4 meter dan tinggi 6 meter. Hitunglah volume air yang dapat ditampung dan jelaskan aplikasi praktis dari perhitungan ini dalam kehidupan sehari-hari.',
    rubric: {
      understanding: 20,
      explanation: 30,
      calculation: 30,
      conclusion: 20
    },
    maxScore: 100,
    timeLimit: 20,
    difficulty: 'hard',
    xpReward: 40
  },
  {
    id: 'cylinder-essay-3',
    module: 'cylinder',
    question: 'Bandingkan luas permukaan tabung dengan volume yang sama tetapi dengan proporsi jari-jari dan tinggi yang berbeda. Manakah yang lebih efisien dari segi material?',
    rubric: {
      understanding: 30,
      explanation: 25,
      calculation: 25,
      conclusion: 20
    },
    maxScore: 100,
    timeLimit: 25,
    difficulty: 'hard',
    xpReward: 45
  }
];

const EssayCard: React.FC<{ question: EssayQuestion; onSelect: () => void }> = ({ 
  question, 
  onSelect 
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
          transition: 'all 0.3s ease'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Chip 
            label={question.difficulty.toUpperCase()} 
            color={getDifficultyColor(question.difficulty) as any}
            size="small"
          />
          <Chip 
            label={`${question.xpReward} XP`} 
            color="primary" 
            size="small"
          />
        </Box>
        
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Essay #{question.id.split('-')[2]}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {question.question.substring(0, 150)}...
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Timer sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption">
              {question.timeLimit} menit
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TrendingUp sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption">
              Max {question.maxScore} poin
            </Typography>
          </Box>
        </Box>
        
        <Button 
          variant="contained" 
          fullWidth 
          onClick={onSelect}
          startIcon={<Assignment />}
        >
          Mulai Essay
        </Button>
      </CardContent>
    </Card>
  );
};

const EssayWriter: React.FC<{ 
  question: EssayQuestion; 
  onSubmit: (answer: string) => void;
  onBack: () => void;
}> = ({ question, onSubmit, onBack }) => {
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(question.timeLimit * 60); // Convert to seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    if (answer.trim().length < 50) {
      alert('Essay terlalu pendek! Minimal 50 karakter.');
      return;
    }
    
    setIsSubmitting(true);
    await onSubmit(answer);
  };

  const getTimeColor = () => {
    if (timeLeft > 300) return 'success'; // > 5 minutes
    if (timeLeft > 120) return 'warning'; // > 2 minutes
    return 'error'; // < 2 minutes
  };

  const timeProgress = ((question.timeLimit * 60 - timeLeft) / (question.timeLimit * 60)) * 100;

  return (
    <Box>
      {/* Timer & Header */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            📝 Essay Practice
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              icon={<Timer />}
              label={formatTime(timeLeft)}
              color={getTimeColor() as any}
              variant="filled"
            />
            <Chip 
              label={`${question.xpReward} XP`}
              color="primary"
            />
          </Box>
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={timeProgress} 
          color={getTimeColor() as any}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Paper>

      {/* Question */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
            📋 Soal Essay
          </Typography>
          
          {question.context && (
            <Alert severity="info" sx={{ mb: 3 }}>
              <strong>Konteks:</strong> {question.context}
            </Alert>
          )}
          
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            {question.question}
          </Typography>
          
          {/* Rubrik */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Lightbulb sx={{ mr: 1, color: 'warning.main' }} />
                <Typography variant="subtitle1" fontWeight="medium">
                  Kriteria Penilaian (Rubrik)
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
                    <Typography variant="h6" color="primary.dark" fontWeight="bold">
                      {question.rubric.understanding}%
                    </Typography>
                    <Typography variant="body2" color="primary.dark">
                      Pemahaman Konsep
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'secondary.light', borderRadius: 2 }}>
                    <Typography variant="h6" color="secondary.dark" fontWeight="bold">
                      {question.rubric.explanation}%
                    </Typography>
                    <Typography variant="body2" color="secondary.dark">
                      Kejelasan Penjelasan
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
                    <Typography variant="h6" color="success.dark" fontWeight="bold">
                      {question.rubric.calculation}%
                    </Typography>
                    <Typography variant="body2" color="success.dark">
                      Langkah Matematis
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
                    <Typography variant="h6" color="warning.dark" fontWeight="bold">
                      {question.rubric.conclusion}%
                    </Typography>
                    <Typography variant="body2" color="warning.dark">
                      Kesimpulan
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

      {/* Answer Input */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            ✍️ Tulis Jawaban Anda
          </Typography>
          
          <TextField
            multiline
            rows={12}
            fullWidth
            variant="outlined"
            placeholder="Tulis jawaban essay Anda di sini... Pastikan untuk menjelaskan langkah-langkah dengan detail dan memberikan kesimpulan yang jelas."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isSubmitting}
            sx={{ mb: 3 }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Karakter: {answer.length} | Minimal: 50
            </Typography>
            
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={onBack}
                disabled={isSubmitting}
              >
                Kembali
              </Button>
              
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={answer.length < 50 || isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : <Send />}
                size="large"
              >
                {isSubmitting ? 'Mengevaluasi...' : 'Kirim Jawaban'}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

const EssayResult: React.FC<{ 
  result: any; 
  onRetry: () => void;
  onNext: () => void;
}> = ({ result, onRetry, onNext }) => {
  const totalScore = Object.values(result.scores).reduce((sum: number, score: any) => sum + score, 0);
  const percentage = Math.round((totalScore / result.maxScore) * 100);
  
  const getGradeColor = (percentage: number) => {
    if (percentage >= 85) return 'success';
    if (percentage >= 70) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <AutoAwesome sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom fontWeight="bold">
            🎉 Essay Selesai Dievaluasi!
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, mb: 3 }}>
            <Box>
              <Typography variant="h2" color={`${getGradeColor(percentage)}.main`} fontWeight="bold">
                {totalScore}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                dari {result.maxScore} poin
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="h2" color={`${getGradeColor(percentage)}.main`} fontWeight="bold">
                {percentage}%
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Nilai Akhir
              </Typography>
            </Box>
          </Box>
          
          <Rating 
            value={Math.round(percentage / 20)} 
            readOnly 
            size="large"
            sx={{ mb: 2 }}
          />
          
          <Chip 
            label={`+${result.earnedXP} XP`}
            color="primary"
            size="large"
            sx={{ fontSize: '1.1rem', py: 2 }}
          />
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            📊 Breakdown Penilaian AI
          </Typography>
          
          <Grid container spacing={3}>
            {Object.entries(result.scores).map(([criterion, score]: [string, any]) => {
              const criterionNames = {
                understanding: 'Pemahaman Konsep',
                explanation: 'Kejelasan Penjelasan', 
                calculation: 'Langkah Matematis',
                conclusion: 'Kesimpulan'
              };
              
              return (
                <Grid item xs={12} sm={6} key={criterion}>
                  <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {score}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {criterionNames[criterion as keyof typeof criterionNames]}
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={(score / 25) * 100} 
                      color="primary"
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>

      {/* AI Feedback */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Psychology sx={{ mr: 1, color: 'secondary.main' }} />
            <Typography variant="h6" fontWeight="bold">
              🤖 Feedback AI Tutor
            </Typography>
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            Feedback ini dihasilkan oleh AI Gemini untuk membantu meningkatkan pemahaman Anda.
          </Alert>
          
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            {result.feedback}
          </Typography>
          
          {result.suggestions && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                💡 Saran Perbaikan:
              </Typography>
              <ul>
                {result.suggestions.map((suggestion: string, index: number) => (
                  <li key={index}>
                    <Typography variant="body2" paragraph>
                      {suggestion}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="outlined"
          onClick={onRetry}
          size="large"
          sx={{ px: 4 }}
        >
          Coba Lagi
        </Button>
        
        <Button
          variant="contained"
          onClick={onNext}
          size="large"
          sx={{ px: 4 }}
        >
          Soal Berikutnya
        </Button>
      </Stack>
    </Box>
  );
};

const EssayPractice: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<EssayQuestion | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const { addXP } = useUserStore();
  
  const {
    evaluateEssay,
    isEvaluating,
    lastEvaluation,
  } = useEssayStore();

  const handleQuestionSelect = (question: EssayQuestion) => {
    setSelectedQuestion(question);
    setShowResult(false);
    setEvaluationResult(null);
  };

  const handleEssaySubmit = async (answer: string) => {
    if (!selectedQuestion) return;
    
    try {
      const result = await evaluateEssay({
        questionId: selectedQuestion.id,
        question: selectedQuestion.question,
        answer: answer,
        rubric: selectedQuestion.rubric,
        maxScore: selectedQuestion.maxScore,
      });
      
      setEvaluationResult(result);
      setShowResult(true);
      addXP(result.earnedXP);
    } catch (error) {
      console.error('Error evaluating essay:', error);
      alert('Terjadi error saat mengevaluasi essay. Silakan coba lagi.');
    }
  };

  const handleBack = () => {
    setSelectedQuestion(null);
    setShowResult(false);
    setEvaluationResult(null);
  };

  const handleNext = () => {
    const currentIndex = essayQuestions.findIndex(q => q.id === selectedQuestion?.id);
    const nextQuestion = essayQuestions[currentIndex + 1];
    
    if (nextQuestion) {
      handleQuestionSelect(nextQuestion);
    } else {
      handleBack(); // Go back to question list if no more questions
    }
  };

  // Question selection view
  if (!selectedQuestion) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            📝 Latihan Soal Essay
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Tingkatkan pemahaman dengan soal essay yang dievaluasi oleh AI tutor
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            💡 Setiap essay akan dievaluasi otomatis oleh AI berdasarkan kriteria: pemahaman konsep, 
            kejelasan penjelasan, langkah matematis, dan kesimpulan.
          </Alert>
        </Box>

        <Grid container spacing={3}>
          {essayQuestions.map((question) => (
            <Grid item xs={12} md={6} lg={4} key={question.id}>
              <EssayCard 
                question={question} 
                onSelect={() => handleQuestionSelect(question)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  // Essay writing or results view
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {showResult && evaluationResult ? (
        <EssayResult 
          result={evaluationResult}
          onRetry={() => {
            setShowResult(false);
            setEvaluationResult(null);
          }}
          onNext={handleNext}
        />
      ) : (
        <EssayWriter 
          question={selectedQuestion}
          onSubmit={handleEssaySubmit}
          onBack={handleBack}
        />
      )}
    </Container>
  );
};

export default EssayPractice;