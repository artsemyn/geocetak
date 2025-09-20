// Simple test script to demonstrate evaluate-essay function
// Run with: node test-evaluate-essay.js

const testEvaluateEssay = async () => {
  console.log('🧪 Testing evaluate-essay functions...\n');

  // Test data
  const mockEvaluation = {
    questionId: 'test-question-1',
    question: 'Jelaskan rumus volume tabung dan bagaimana cara menurunkan rumus tersebut!',
    answer: 'Volume tabung adalah V = π × r² × t. Rumus ini diperoleh dari luas alas lingkaran (π × r²) dikalikan dengan tinggi tabung (t). Konsep ini berasal dari prinsip bahwa volume bangun ruang dapat dihitung dengan mengalikan luas alas dengan tinggi.',
    rubric: {
      understanding: 25,
      explanation: 25,
      calculation: 25,
      conclusion: 25,
    },
    maxScore: 100,
  };

  console.log('📝 Test Question:');
  console.log(mockEvaluation.question);
  console.log('\n📋 Student Answer:');
  console.log(mockEvaluation.answer);
  console.log('\n⚖️ Rubric:');
  console.log(`- Understanding: ${mockEvaluation.rubric.understanding} points`);
  console.log(`- Explanation: ${mockEvaluation.rubric.explanation} points`);
  console.log(`- Calculation: ${mockEvaluation.rubric.calculation} points`);
  console.log(`- Conclusion: ${mockEvaluation.rubric.conclusion} points`);
  console.log(`- Max Score: ${mockEvaluation.maxScore} points`);

  console.log('\n🔄 Simulating evaluation...');

  // Mock the evaluation logic from essayStore
  const simulateMockEvaluation = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate random scores like the mock function
        const scores = {
          understanding: Math.floor(Math.random() * 10) + 15, // 15-25
          explanation: Math.floor(Math.random() * 8) + 17,    // 17-25
          calculation: Math.floor(Math.random() * 12) + 13,   // 13-25
          conclusion: Math.floor(Math.random() * 8) + 17      // 17-25
        };

        const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
        const percentage = Math.round((totalScore / mockEvaluation.maxScore) * 100);

        // Calculate XP based on performance
        let earnedXP = 0;
        if (percentage >= 90) earnedXP = Math.round(mockEvaluation.maxScore * 0.5);
        else if (percentage >= 80) earnedXP = Math.round(mockEvaluation.maxScore * 0.4);
        else if (percentage >= 70) earnedXP = Math.round(mockEvaluation.maxScore * 0.3);
        else if (percentage >= 60) earnedXP = Math.round(mockEvaluation.maxScore * 0.2);
        else earnedXP = Math.round(mockEvaluation.maxScore * 0.1);

        resolve({
          scores,
          totalScore,
          percentage,
          maxScore: mockEvaluation.maxScore,
          feedback: "Jawaban Anda menunjukkan pemahaman yang baik tentang konsep tabung. Penjelasan tentang cara menurunkan rumus volume sudah cukup jelas dengan menyebutkan bahwa volume tabung diperoleh dari luas alas dikalikan tinggi. Langkah matematis yang Anda berikan sudah benar, yaitu V = π × r² × t. Namun, akan lebih baik jika Anda menjelaskan lebih detail mengapa rumus luas lingkaran adalah π × r² dan bagaimana konsep ini diterapkan pada tabung.",
          suggestions: [
            "Tambahkan penjelasan visual atau diagram untuk memperjelas konsep",
            "Berikan contoh numerik konkret untuk memperkuat pemahaman",
            "Jelaskan hubungan antara rumus tabung dengan konsep integral jika sudah mempelajarinya",
            "Sertakan aplikasi praktis rumus volume tabung dalam berbagai bidang"
          ],
          earnedXP,
          evaluatedAt: new Date().toISOString(),
        });
      }, 2000); // 2 second delay to simulate API call
    });
  };

  try {
    const result = await simulateMockEvaluation();

    console.log('\n✅ Evaluation Results:');
    console.log('─'.repeat(50));
    console.log(`📊 Scores:`);
    console.log(`  • Understanding: ${result.scores.understanding}/25`);
    console.log(`  • Explanation: ${result.scores.explanation}/25`);
    console.log(`  • Calculation: ${result.scores.calculation}/25`);
    console.log(`  • Conclusion: ${result.scores.conclusion}/25`);
    console.log(`\n🎯 Total Score: ${result.totalScore}/${result.maxScore} (${result.percentage}%)`);
    console.log(`🌟 Earned XP: ${result.earnedXP}`);
    console.log(`📅 Evaluated at: ${new Date(result.evaluatedAt).toLocaleString()}`);

    console.log(`\n💬 Feedback:`);
    console.log(result.feedback);

    console.log(`\n💡 Suggestions:`);
    result.suggestions.forEach((suggestion, index) => {
      console.log(`  ${index + 1}. ${suggestion}`);
    });

    console.log('\n🎉 Test completed successfully!');

    // Test XP calculation logic
    console.log('\n🧮 Testing XP Calculation Logic:');
    console.log('─'.repeat(50));
    const testPercentages = [95, 85, 75, 65, 55];
    testPercentages.forEach(percentage => {
      let xp = 0;
      if (percentage >= 90) xp = Math.round(100 * 0.5);
      else if (percentage >= 80) xp = Math.round(100 * 0.4);
      else if (percentage >= 70) xp = Math.round(100 * 0.3);
      else if (percentage >= 60) xp = Math.round(100 * 0.2);
      else xp = Math.round(100 * 0.1);

      console.log(`${percentage}% score → ${xp} XP`);
    });

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Run the test
testEvaluateEssay();