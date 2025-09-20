#!/bin/bash

# Test script for Supabase Edge Function
# To run this test, first start Supabase locally with:
# supabase start

echo "🧪 Testing Supabase Edge Function - evaluate-essay"
echo "=================================================="

# Test data
TEST_PROMPT=$(cat <<'EOF'
Anda adalah seorang tutor matematika ahli yang akan mengevaluasi jawaban essay siswa tentang geometri bangun ruang (tabung/cylinder).

SOAL:
"Jelaskan rumus volume tabung dan bagaimana cara menurunkan rumus tersebut!"

JAWABAN SISWA:
"Volume tabung adalah V = π × r² × t. Rumus ini diperoleh dari luas alas lingkaran dikalikan tinggi tabung."

KRITERIA PENILAIAN:
1. Pemahaman Konsep (25%): Seberapa baik siswa memahami konsep dasar tabung
2. Kejelasan Penjelasan (25%): Seberapa jelas dan terstruktur penjelasan yang diberikan
3. Langkah Matematis (25%): Ketepatan dan kelengkapan langkah-langkah perhitungan matematis
4. Kesimpulan (25%): Kualitas kesimpulan dan aplikasi praktis

INSTRUKSI EVALUASI:
1. Berikan skor untuk setiap kriteria (0-25 poin) berdasarkan persentase bobot di atas
2. Berikan feedback konstruktif yang membantu siswa belajar
3. Sertakan 3-5 saran perbaikan yang spesifik
4. Gunakan bahasa Indonesia yang ramah dan mendorong

FORMAT RESPONS (HARUS DALAM JSON):
{
  "scores": {
    "understanding": [0-25],
    "explanation": [0-25],
    "calculation": [0-25],
    "conclusion": [0-25]
  },
  "feedback": "Feedback lengkap dalam bahasa Indonesia...",
  "suggestions": [
    "Saran perbaikan 1...",
    "Saran perbaikan 2...",
    "Saran perbaikan 3..."
  ]
}

PENTING: Respons harus HANYA berupa JSON yang valid, tanpa teks tambahan apapun.
EOF
)

echo "📝 Testing with sample prompt..."
echo "Prompt length: ${#TEST_PROMPT} characters"

# Test 1: Valid request
echo ""
echo "🔵 Test 1: Valid request"
echo "------------------------"

curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/evaluate-essay' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
  --header 'Content-Type: application/json' \
  --data "{\"prompt\": \"$TEST_PROMPT\", \"maxTokens\": 1000}"

echo ""
echo ""

# Test 2: Missing prompt
echo "🔴 Test 2: Missing prompt (should return 400)"
echo "----------------------------------------------"

curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/evaluate-essay' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
  --header 'Content-Type: application/json' \
  --data "{\"maxTokens\": 1000}"

echo ""
echo ""

# Test 3: CORS preflight
echo "🟡 Test 3: CORS preflight request"
echo "----------------------------------"

curl -i --location --request OPTIONS 'http://127.0.0.1:54321/functions/v1/evaluate-essay' \
  --header 'Origin: http://localhost:3000' \
  --header 'Access-Control-Request-Method: POST' \
  --header 'Access-Control-Request-Headers: authorization, content-type'

echo ""
echo ""

echo "✅ Test completed!"
echo ""
echo "💡 To run these tests:"
echo "1. Start Supabase locally: supabase start"
echo "2. Make sure GEMINI_API_KEY is set in your .env file"
echo "3. Run this script: bash test-supabase-function.sh"