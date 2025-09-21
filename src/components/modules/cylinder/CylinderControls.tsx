import React from 'react';
import {
  Card,
  CardContent,
  Slider,
  Switch,
  FormControlLabel,
  Box,
  Chip,
  Grid,
  Button,
  Stack,
} from '@mui/material';
import { PlayArrow, Pause, Refresh, ViewInAr } from '@mui/icons-material';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { useCylinderStore } from '../../../stores/cylinderStore';

const CylinderControls: React.FC = () => {
  const {
    radius,
    height,
    showWireframe,
    showNet,
    showFormula,
    isAnimating,
    volume,
    surfaceArea,
    setRadius,
    setHeight,
    toggleWireframe,
    toggleNet,
    toggleFormula,
    setAnimating,
    calculateValues,
  } = useCylinderStore();

  React.useEffect(() => {
    calculateValues();
  }, [radius, height, calculateValues]);

  const formatNumber = (num: number) => num.toFixed(2);

  return (
    <Container>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Kontrol Tabung
        </Typography>
        
        {/* Parameter Controls */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Jari-jari (r): {formatNumber(radius)} unit
          </Typography>
          <Slider
            value={radius}
            onChange={(_, value) => setRadius(value as number)}
            min={0.5}
            max={3}
            step={0.1}
            valueLabelDisplay="auto"
            color="primary"
          />
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Tinggi (t): {formatNumber(height)} unit
          </Typography>
          <Slider
            value={height}
            onChange={(_, value) => setHeight(value as number)}
            min={0.5}
            max={4}
            step={0.1}
            valueLabelDisplay="auto"
            color="primary"
          />
        </Box>
        
        {/* Display Options */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Opsi Tampilan
          </Typography>
          <Stack spacing={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={showWireframe}
                  onChange={toggleWireframe}
                  color="primary"
                />
              }
              label="Mode Wireframe"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={showNet}
                  onChange={toggleNet}
                  color="secondary"
                />
              }
              label="Tampilkan Jaring-jaring"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={showFormula}
                  onChange={toggleFormula}
                  color="success"
                />
              }
              label="Tampilkan Rumus"
            />
          </Stack>
        </Box>
        
        {/* Animation Controls */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Animasi
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant={isAnimating ? "contained" : "outlined"}
              onClick={() => setAnimating(!isAnimating)}
              startIcon={isAnimating ? <Pause /> : <PlayArrow />}
              size="small"
            >
              {isAnimating ? 'Pause' : 'Play'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setRadius(1);
                setHeight(2);
              }}
              startIcon={<Refresh />}
              size="small"
            >
              Reset
            </Button>
          </Stack>
        </Box>
        
        {/* Calculated Values */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Hasil Perhitungan
          </Typography>
          <Grid container spacing={1}>
            <Grid xs={6}>
              <Chip
                label={`V = ${formatNumber(volume)}`}
                color="primary"
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid xs={6}>
              <Chip
                label={`LP = ${formatNumber(surfaceArea)}`}
                color="secondary"
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Container>
  );
};

export default CylinderControls;