// src/components/practice/EssayResult.tsx
import React from 'react';
import { Card, CardContent, Typography, Paper, Chip, List, ListItem, ListItemText, Stack, Button } from '@mui/material';
import type { EvaluationResult } from '../../types';

interface EssayResultProps {
  result: EvaluationResult;
  onRetry: () => void;
  onNext: () => void;
}

const EssayResult: React.FC<EssayResultProps> = ({ result, onRetry, onNext }) => (
    <Card>
        <CardContent>
            <Typography variant="h4" gutterBottom>🎉 Hasil Evaluasi</Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="h5" color="primary.main">{result.percentage}% ({result.totalScore}/{result.maxScore})</Typography>
                <Chip label={`+${result.earnedXP} XP`} color="success" size="medium" sx={{ mt: 1 }} />
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography fontWeight="bold">Feedback AI:</Typography>
                <Typography variant="body2">{result.feedback}</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography fontWeight="bold">Saran:</Typography>
                <List dense>
                    {result.suggestions.map((s, i) => <ListItem key={i}><ListItemText primary={s} /></ListItem>)}
                </List>
            </Paper>
            <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="outlined" onClick={onRetry}>Coba Lagi</Button>
                <Button variant="contained" onClick={onNext}>Soal Berikutnya</Button>
            </Stack>
        </CardContent>
    </Card>
);

export default EssayResult;
