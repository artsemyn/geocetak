// src/data/learningModules.ts
import type { Module } from '../types';

export const getLearningModules = (completedModules: string[], completedCylinderLessons: string[]): Module[] => [
    {
      id: 'cylinder', title: 'Tabung (Cylinder)',
      description: 'Pelajari konsep tabung melalui visualisasi 3D interaktif dan penemuan rumus.',
      icon: '🔵', isAvailable: true, isCompleted: completedModules.includes('cylinder'), progress: 65,
      estimatedTime: '45 menit', xpReward: 110, difficulty: 'Pemula', prerequisites: [],
      learningObjectives: [
        'Memahami unsur-unsur tabung (alas, tutup, selimut)',
        'Menurunkan rumus volume dan luas permukaan',
        'Mengaplikasikan konsep tabung dalam kehidupan sehari-hari',
      ],
      subLessons: [
        { id: 'concept', title: 'Konsep & Unsur', type: 'concept', duration: 10, isCompleted: completedCylinderLessons.includes('concept'), description: '' },
        { id: 'net', title: 'Jaring-Jaring Interaktif', type: 'interactive', duration: 8, isCompleted: completedCylinderLessons.includes('net'), description: '' },
        { id: 'formula', title: 'Penemuan Rumus', type: 'formula', duration: 15, isCompleted: completedCylinderLessons.includes('formula'), description: '' },
        { id: 'quiz', title: 'Quiz & Latihan', type: 'quiz', duration: 12, isCompleted: completedCylinderLessons.includes('quiz'), description: '' }
      ]
    },
    {
      id: 'cone', title: 'Kerucut (Cone)',
      description: 'Eksplorasi mendalam tentang kerucut dan aplikasinya.',
      icon: '🔺', isAvailable: completedModules.includes('cylinder'), isCompleted: completedModules.includes('cone'), progress: 0,
      estimatedTime: '50 menit', xpReward: 120, difficulty: 'Menengah', prerequisites: ['Modul Tabung'],
      learningObjectives: [], subLessons: []
    },
    {
      id: 'sphere', title: 'Bola (Sphere)',
      description: 'Memahami geometri bola dan hubungannya dengan bangun ruang lainnya.',
      icon: '⚪', isAvailable: completedModules.includes('cone'), isCompleted: completedModules.includes('sphere'), progress: 0,
      estimatedTime: '55 menit', xpReward: 130, difficulty: 'Lanjutan',
      prerequisites: ['Modul Tabung', 'Modul Kerucut'],
      learningObjectives: [], subLessons: []
    }
];
