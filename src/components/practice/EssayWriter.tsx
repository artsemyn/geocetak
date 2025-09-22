// src/components/practice/EssayWriter.tsx
import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Stack, Button, CircularProgress } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useEssayStore } from '../../stores/essayStore';
import type { EssayQuestion } from '../../types';

interface EssayWriterProps {
  question: EssayQuestion;
  onSubmit: (answer: string) => void;
  onBack: () => void;
}

const EssayWriter: React.FC<EssayWriterProps> = ({ question, onSubmit, onBack }) => {
    const [answer, setAnswer] = useState('');
    const { isEvaluating } = useEssayStore();
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>{question.question}</Typography>
                <TextField multiline rows={10} fullWidth variant="outlined" placeholder="Tulis jawaban Anda..." value={answer} onChange={(e) => setAnswer(e.target.value)} disabled={isEvaluating} sx={{ mb: 2 }} />
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={onBack} disabled={isEvaluating}>Kembali</Button>
                    <Button variant="contained" onClick={() => onSubmit(answer)} disabled={isEvaluating || answer.length < 20} startIcon={isEvaluating ? <CircularProgress size={20} /> : <Send />}>
                        {isEvaluating ? 'Mengevaluasi...' : 'Kirim'}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default EssayWriter;
