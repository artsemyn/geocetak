// src/pages/CylinderLessonLayout.tsx

import React, { useState, useEffect, Suspense, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Slider,
  Switch,
  Tabs,
  Tab,
  Chip,
  Paper,
  Breadcrumbs,
  Link,
  Alert,
  Divider,
  Stack,
  IconButton,
  Tooltip,
  Badge,
  FormControlLabel,
  CircularProgress,
  Avatar
} from '@mui/material';
import {
  ArrowBack,
  Home,
  School,
  PlayArrow,
  Pause,
  Refresh,
  Settings,
  Calculate,
  Visibility,
  VisibilityOff,
  TuneRounded,
  AssessmentRounded,
  MenuBookRounded,
  Quiz,
  Celebration,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { useCylinderStore } from '../stores/cylinderStore';
import { useUserStore } from '../stores/userStore';
import CylinderQuiz from '../components/modules/cylinder/CylinderQuiz';
import PageHeader from '../components/layout/PageHeader';
import ProgressSummaryPage from '../components/modules/cylinder/ProgressSummary';

// --- Komponen 3D ---

const Cylinder3D: React.FC = () => {
  const { radius, height, showWireframe, isAnimating } = useCylinderStore();
  const meshRef = useRef<any>();

  useFrame((_, delta) => {
    if (isAnimating && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <cylinderGeometry args={[radius, radius, height, 32]} />
      <meshStandardMaterial
        color="#667eea"
        wireframe={showWireframe}
        transparent={showWireframe}
        opacity={showWireframe ? 0.6 : 1}
        metalness={0.2}
        roughness={0.4}
      />
    </mesh>
  );
};

const CylinderNet: React.FC = () => {
  const { radius, height } = useCylinderStore();
  const circumference = 2 * Math.PI * radius;

  return (
    <group>
      {/* Alas */}
      <mesh position={[0, -height / 2 - radius - 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 32]} />
        <meshStandardMaterial color="#764ba2" side={2} />
      </mesh>
      {/* Tutup */}
      <mesh position={[0, height / 2 + radius + 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 32]} />
        <meshStandardMaterial color="#764ba2" side={2} />
      </mesh>
      {/* Selimut */}
      <mesh>
        <planeGeometry args={[circumference, height]} />
        <meshStandardMaterial color="#667eea" side={2} />
      </mesh>
    </group>
  );
};


// --- Komponen Pelajaran (Diisi dari PDF) ---

const ConceptLesson: React.FC = () => (
  <Box>
    <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
      🎯 Konsep dan Unsur-unsur Tabung
    </Typography>
    <Alert severity="info" sx={{ mb: 3 }}>
      Gunakan kontrol di sebelah kanan untuk mengubah jari-jari dan tinggi tabung secara interaktif!
    </Alert>
    <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
      Tabung adalah bangun ruang yang dibatasi oleh dua bidang lingkaran yang sejajar dan kongruen (sama bentuk dan ukuran) serta sebuah bidang lengkung yang disebut selimut tabung. Bayangkan sebuah kaleng susu atau gelas; itulah bentuk tabung dalam kehidupan sehari-hari.
    </Typography>
    <Divider sx={{ my: 3 }} />
    <Typography variant="h5" gutterBottom fontWeight="bold">
      🔍 Unsur-unsur Utama Tabung:
    </Typography>
    <Grid container spacing={3}>
      {[
        { title: "Sisi Alas dan Tutup", desc: "Dua lingkaran yang identik dan sejajar. Keduanya merupakan pusat dari tabung.", icon: "🔵" },
        { title: "Selimut Tabung", desc: "Sisi lengkung yang menghubungkan alas dan tutup. Jika dibuka, akan berbentuk persegi panjang.", icon: "🔄" },
        { title: "Jari-jari (r)", desc: "Jarak dari titik pusat lingkaran (alas/tutup) ke tepi lingkaran.", icon: "📏" },
        { title: "Tinggi (t)", desc: "Jarak tegak lurus antara bidang alas dan tutup tabung.", icon: "📐" }
      ].map((item) => (
        <Grid item xs={12} sm={6} key={item.title}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}>{item.icon}</Avatar>
              <Box>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const NetLesson: React.FC = () => {
  const { toggleNet, showNet } = useCylinderStore();
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="secondary.dark">
        🔄 Jaring-jaring Tabung
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
        Jika sebuah tabung kita potong pada beberapa rusuknya dan kita buka, maka akan terbentuk sebuah jaring-jaring tabung. Jaring-jaring ini memperlihatkan semua permukaan tabung dalam bentuk datar.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              </Box>
      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
        Seperti yang terlihat, jaring-jaring tabung terdiri dari:
        <ul>
          <li><b>Dua buah lingkaran</b> yang sama besar, berfungsi sebagai alas dan tutup.</li>
          <li><b>Satu buah persegi panjang</b> yang berfungsi sebagai selimut tabung. Panjang persegi panjang ini sama dengan keliling lingkaran alas, dan lebarnya sama dengan tinggi tabung.</li>
        </ul>
      </Typography>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button
          variant="contained"
          onClick={toggleNet}
          size="large"
          color={showNet ? "secondary" : "primary"}
        >
          {showNet ? 'Kembalikan ke Bentuk Tabung' : 'Lihat Jaring-Jaring 3D'}
        </Button>
      </Box>
    </Box>
  );
};

const FormulaLesson: React.FC = () => {
  const { radius, height, volume, surfaceArea } = useCylinderStore();
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="success.dark">
        🧮 Penemuan Rumus Tabung
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
        Dengan memahami jaring-jaring tabung, kita bisa dengan mudah menurunkan rumus untuk menghitung luas permukaan dan volumenya.
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 3, borderColor: 'primary.main', height: '100%' }}>
            <Typography variant="h5" color="primary.dark" fontWeight="bold" gutterBottom>Volume Tabung</Typography>
            <Typography paragraph>Prinsip volume untuk bangun ruang seperti tabung (dan prisma) adalah <strong>Luas Alas × Tinggi</strong>.</Typography>
            <Typography>Luas Alas (Lingkaran) = $ \pi r^2 $</Typography>
            <Typography>Maka, Volume = $ (\pi r^2) \times t $</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" align="center" sx={{ p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
              $ V = \pi r^2 t $
            </Typography>
            <Typography align="center" sx={{ mt: 2 }}>
              Hasil: <strong>{volume.toFixed(2)} unit³</strong>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 3, borderColor: 'secondary.main', height: '100%' }}>
            <Typography variant="h5" color="secondary.dark" fontWeight="bold" gutterBottom>Luas Permukaan Tabung</Typography>
            <Typography paragraph>Luas permukaan adalah total luas dari semua sisi pada jaring-jaringnya.</Typography>
            <Typography>Luas = (2 × Luas Alas) + Luas Selimut</Typography>
            <Typography>Luas = $ (2 \times \pi r^2) + (2 \pi r \times t) $</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" align="center" sx={{ p: 2, bgcolor: 'secondary.light', borderRadius: 2 }}>
              $ L = 2 \pi r (r + t) $
            </Typography>
            <Typography align="center" sx={{ mt: 2 }}>
              Hasil: <strong>{surfaceArea.toFixed(2)} unit²</strong>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

// --- Komponen Layout Utama ---

const TabPanel: React.FC<{ children?: React.ReactNode; index: number; value: number;}> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const CylinderLessonLayout: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const {
    radius, height, showWireframe, showNet, isAnimating, volume, surfaceArea,
    completedLessons, setRadius, setHeight, toggleWireframe, toggleNet,
    setAnimating, calculateValues, completeLesson, interactionCount,
  } = useCylinderStore();
  
  const { addXP, startLearningSession, endLearningSession } = useUserStore();

  useEffect(() => {
    calculateValues();
  }, [radius, height, calculateValues]);

  // Start learning session when component mounts
  useEffect(() => {
    startLearningSession('cylinder', 'overview');
    
    // Cleanup: end session when component unmounts
    return () => {
      endLearningSession(interactionCount);
    };
  }, [startLearningSession, endLearningSession, interactionCount]);
  
  const allLessonsCompleted = completedLessons.length >= 4;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    // End current lesson session
    endLearningSession(interactionCount);
    
    setTabValue(newValue);
    const lessonId = ['concept', 'net', 'formula', 'quiz'][newValue];
    
    // Start new lesson session
    startLearningSession('cylinder', lessonId);
    
    if (!completedLessons.includes(lessonId)) {
      completeLesson(lessonId);
      addXP(10); // Tambah 10 XP setiap membuka tab baru
    }
  };

  if (allLessonsCompleted) {
      return <ProgressSummaryPage />;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <PageHeader
        title="🔵 Modul Pembelajaran: Tabung"
        subtitle="Pelajari konsep tabung melalui visualisasi 3D interaktif dan penemuan rumus."
      />

      <Grid container spacing={3}>
        {/* Kolom Kiri: Viewport 3D */}
        <Grid item xs={12} lg={7}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ height: 500, position: 'relative', background: '#f0f4f8', borderRadius: 2 }}>
                <Suspense fallback={<CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />}>
                  <Canvas shadows camera={{ position: [5, 4, 7], fov: 50 }}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
                    <Environment preset="studio" />
                    {showNet ? <CylinderNet /> : <Cylinder3D />}
                    <ContactShadows opacity={0.5} scale={15} blur={1} far={10} resolution={256} color="#000000" />
                    <OrbitControls minDistance={3} maxDistance={20} />
                  </Canvas>
                </Suspense>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Kolom Kanan: Kontrol */}
        <Grid item xs={12} lg={5}>
            <Card>
                <CardContent>
                    <Typography variant="h6" fontWeight="bold">Kontrol Interaktif</Typography>
                    <Divider sx={{ my: 2 }} />
                     <Box sx={{ px: 1 }}>
                        <Typography gutterBottom>Jari-jari (r): {radius.toFixed(1)}</Typography>
                        <Slider value={radius} onChange={(_, v) => setRadius(v as number)} min={0.5} max={3} step={0.1} />
                        
                        <Typography gutterBottom>Tinggi (t): {height.toFixed(1)}</Typography>
                        <Slider value={height} onChange={(_, v) => setHeight(v as number)} min={0.5} max={5} step={0.1} />
                     </Box>
                    <Divider sx={{ my: 2 }} />
                    <Stack spacing={1}>
                        <FormControlLabel control={<Switch checked={isAnimating} onChange={() => setAnimating(!isAnimating)} />} label="Animasi Rotasi" />
                        <FormControlLabel control={<Switch checked={showWireframe} onChange={toggleWireframe} />} label="Mode Wireframe" />
                        <FormControlLabel control={<Switch checked={showNet} onChange={toggleNet} />} label="Tampilkan Jaring-jaring" />
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
        
        {/* Konten Pelajaran di Bawah */}
        <Grid item xs={12}>
            <Card>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
                        <Tab icon={<MenuBookRounded />} label="Konsep" />
                        <Tab icon={<Settings />} label="Jaring-jaring" />
                        <Tab icon={<Calculate />} label="Rumus" />
                        <Tab icon={<Quiz />} label="Quiz" />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}><ConceptLesson /></TabPanel>
                <TabPanel value={tabValue} index={1}><NetLesson /></TabPanel>
                <TabPanel value={tabValue} index={2}><FormulaLesson /></TabPanel>
                <TabPanel value={tabValue} index={3}><CylinderQuiz /></TabPanel>
            </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CylinderLessonLayout;

