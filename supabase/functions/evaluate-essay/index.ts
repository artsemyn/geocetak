// supabase/functions/evaluate-essay/index.ts
// KODE INI BERJALAN DI SERVER SUPABASE, BUKAN DI BROWSER
// Ia akan menerima panggilan dari frontend, menjalankan logika, dan mengembalikan hasil.

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

// Ambil API Key dari Supabase Secrets (Aman)
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;

serve(async (req) => {
  // Handle preflight request for CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { question, answer, rubric, max_score } = await req.json();

    const prompt = `
      Anda adalah seorang "AI Tutor" untuk mata pelajaran matematika, khususnya geometri.
      Tugas Anda adalah mengevaluasi jawaban esai dari seorang siswa secara objektif berdasarkan rubrik yang diberikan.

      Berikut adalah detailnya:
      - Soal Esai: "${question}"
      - Jawaban Siswa: "${answer}"
      - Rubrik Penilaian (Total Poin Maksimal: ${max_score}):
        - Pemahaman Konsep: Bobot ${rubric.understanding}%
        - Kejelasan Penjelasan: Bobot ${rubric.explanation}%
        - Akurasi Langkah Matematis/Perhitungan: Bobot ${rubric.calculation}%
        - Kesimpulan: Bobot ${rubric.conclusion}%

      Tolong berikan output dalam format JSON yang valid tanpa tambahan teks apa pun. Strukturnya harus seperti ini:
      {
        "scores": {
          "understanding": <skor_pemahaman_konsep_numerik>,
          "explanation": <skor_kejelasan_penjelasan_numerik>,
          "calculation": <skor_langkah_matematis_numerik>,
          "conclusion": <skor_kesimpulan_numerik>
        },
        "feedback": "<feedback_umum_untuk_siswa_dalam_satu_paragraf_singkat>",
        "suggestions": [
          "<saran_perbaikan_pertama_yang_spesifik>",
          "<saran_perbaikan_kedua_yang_spesifik>",
          "<saran_perbaikan_ketiga_yang_spesifik>"
        ]
      }
    `;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        response_mime_type: "application/json",
      },
    };

    // Panggil API Google Gemini
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`API request failed: ${await response.text()}`);

    const result = await response.json();
    const evaluationJson = JSON.parse(result.candidates[0].content.parts[0].text);
    
    // Hitung total skor dan persentase di backend
    const totalScore = Object.values(evaluationJson.scores).reduce((sum: number, score: any) => sum + score, 0);
    const percentage = Math.round((totalScore / max_score) * 100);

    const finalResult = {
      ...evaluationJson,
      totalScore,
      percentage,
      maxScore: max_score,
    };

    // Kirim hasil kembali ke frontend
    return new Response(JSON.stringify({ result: finalResult }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

