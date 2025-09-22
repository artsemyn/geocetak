// src/components/practice/EssayCard.tsx
import React from 'react';
import { Card, CardContent, CardActions, Chip, Typography, Button } from '@mui/material';
import { Assignment } from '@mui/icons-material';
import type { EssayQuestion } from '../../types';

interface EssayCardProps {
  question: EssayQuestion;
  onSelect: () => void;
}

const EssayCard: React.FC<EssayCardProps> = ({ question, onSelect }) => {
    const getDifficultyColor = (d: string) => d === 'easy' ? 'success' : d === 'medium' ? 'warning' : 'error';
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Chip label={question.difficulty} color={getDifficultyColor(question.difficulty)} size="small" sx={{ mb: 1 }} />
                <Typography variant="h6" fontWeight="bold">{question.question}</Typography>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
                <Button fullWidth variant="contained" onClick={onSelect} startIcon={<Assignment />}>Mulai Esai</Button>
            </CardActions>
        </Card>
    );
};

export default EssayCard;
