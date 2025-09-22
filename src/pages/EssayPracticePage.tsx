// src/pages/EssayPracticePage.tsx
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useUserStore } from '../stores/userStore';
import { useEssayStore } from '../stores/essayStore';
import { essayQuestions } from '../data/essayQuestion';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import EssayCard from '../components/practice/EssayCard';
import EssayWriter from '../components/practice/EssayWriter';
import EssayResult from '../components/practice/EssayResult';
import type { EssayQuestion, EvaluationResult } from '../types';

const EssayPracticePage: React.FC = () => {
    const [selectedQuestion, setSelectedQuestion] = useState<EssayQuestion | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
    const { addXP } = useUserStore();
    const { evaluateEssay } = useEssayStore();

    const handleSelect = (q: EssayQuestion) => {
        setSelectedQuestion(q);
        setShowResult(false);
        setEvaluationResult(null);
    };
    const handleSubmit = async (answer: string) => {
        if (!selectedQuestion) return;
        const result = await evaluateEssay({
            questionId: selectedQuestion.id,
            question: selectedQuestion.question,
            answer,
            rubric: selectedQuestion.rubric,
            maxScore: selectedQuestion.maxScore,
        });
        setEvaluationResult(result);
        setShowResult(true);
        addXP(result.earnedXP);
    };
    const handleBack = () => setSelectedQuestion(null);
    const handleNext = () => {
        const currentIndex = essayQuestions.findIndex(q => q.id === selectedQuestion?.id);
        const nextQuestion = essayQuestions[currentIndex + 1];
        if (nextQuestion) { handleSelect(nextQuestion); }
        else { handleBack(); }
    };

    if (!selectedQuestion) {
        return (
            <PageContainer>
                <PageHeader title="Latihan Soal Esai" subtitle="Asah pemahaman Anda dengan soal esai yang dievaluasi oleh AI." />
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                    {essayQuestions.map((q) => (
                        <EssayCard key={q.id} question={q} onSelect={() => handleSelect(q)} />
                    ))}
                </Box>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            {showResult && evaluationResult ? (
                <EssayResult result={evaluationResult} onRetry={() => setShowResult(false)} onNext={handleNext} />
            ) : (
                <EssayWriter question={selectedQuestion} onSubmit={handleSubmit} onBack={handleBack} />
            )}
        </PageContainer>
    );
};

export default EssayPracticePage;
