import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from '@mui/material';
import { ExpandMore, Lightbulb, Calculate } from '@mui/icons-material';
import { useCylinderStore } from '../../../stores/cylinderStore';

const FormulaDiscovery: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { radius, height, volume, surfaceArea } = useCylinderStore();

  const steps = [
    {
      label: 'Memahami Komponen Tabung',
      content: 'Tabung terdiri dari 2 lingkaran (alas dan tutup) dan 1 selimut tabung.',
    },
    {
      label: 'Menghitung Luas Alas',
      content: `Luas alas = π × r² = π × ${radius}² = ${(Math.PI * radius * radius).toFixed(2)}`,
    },
    {
      label: 'Menghitung Volume',
      content: `Volume = Luas Alas × Tinggi = ${(Math.PI * radius * radius).toFixed(2)} × ${height} = ${volume.toFixed(2)}`,
    },
    {
      label: 'Menghitung Luas Permukaan',
      content: `LP = 2πr(r + t) = 2π×${radius}×(${radius} + ${height}) = ${surfaceArea.toFixed(2)}`,
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Lightbulb sx={{ mr: 1, color: 'orange' }} />
          <Typography variant="h6">
            Penemuan Rumus Interaktif
          </Typography>
        </Box>
        
        <Alert severity="info" sx={{ mb: 2 }}>
          Ikuti langkah-langkah untuk memahami bagaimana rumus tabung diturunkan!
        </Alert>
        
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {step.content}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={index === steps.length - 1}
                  >
                    {index === steps.length - 1 ? 'Selesai' : 'Lanjut'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Kembali
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              🎉 Selamat! Anda telah menguasai rumus tabung!
            </Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Ulangi Pembelajaran
            </Button>
          </Paper>
        )}
        
        {/* Quick Reference */}
        <Box sx={{ mt: 3 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Calculate sx={{ mr: 1 }} />
                <Typography variant="subtitle1">Rumus Lengkap</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Typography variant="body2" gutterBottom>
                  <strong>Volume Tabung:</strong> V = π × r² × t
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Luas Permukaan:</strong> LP = 2πr(r + t)
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Luas Selimut:</strong> LS = 2πrt
                </Typography>
                <Typography variant="body2">
                  <strong>Luas Alas:</strong> LA = πr²
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FormulaDiscovery;