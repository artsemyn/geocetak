// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

console.log("Hello from Functions!")

Deno.serve(async (req) => {
  const { name } = await req.json()
  const data = {
    message: `Hello ${name}!`,
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/evaluate-essay' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
// supabase/functions/evaluate-essay/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EvaluationRequest {
  prompt: string;
  maxTokens?: number;
}

interface EvaluationResponse {
  result: string;
  tokensUsed?: number;
  error?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get Gemini API key from environment variables
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not found in environment variables')
    }

    // Parse request body
    const { prompt, maxTokens = 1000 }: EvaluationRequest = await req.json()
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(geminiApiKey)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature: 0.3, // Lower temperature for more consistent evaluation
        topP: 0.8,
        topK: 40,
      },
    })

    console.log('Sending prompt to Gemini API...')
    
    // Generate content using Gemini
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    console.log('Received response from Gemini API')
    
    // Clean up the response (remove any markdown formatting if present)
    let cleanedText = text.trim()
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    }
    if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }
    
    // Validate JSON response
    let parsedResult
    try {
      parsedResult = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', parseError)
      console.error('Raw response:', text)
      
      // Return a fallback response
      return new Response(
        JSON.stringify({ 
          error: 'Invalid response format from AI model',
          rawResponse: text
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
    
    // Validate required fields in response
    const requiredFields = ['scores', 'feedback', 'suggestions']
    const missingFields = requiredFields.filter(field => !(field in parsedResult))
    
    if (missingFields.length > 0) {
      console.error('Missing required fields in response:', missingFields)
      return new Response(
        JSON.stringify({ 
          error: `Missing required fields: ${missingFields.join(', ')}`,
          response: parsedResult
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
    
    // Validate scores structure
    const scores = parsedResult.scores
    const requiredScoreFields = ['understanding', 'explanation', 'calculation', 'conclusion']
    const missingScoreFields = requiredScoreFields.filter(field => !(field in scores))
    
    if (missingScoreFields.length > 0) {
      console.error('Missing score fields:', missingScoreFields)
      return new Response(
        JSON.stringify({ 
          error: `Missing score fields: ${missingScoreFields.join(', ')}`,
          response: parsedResult
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
    
    // Ensure scores are within valid range (0-25)
    for (const [field, score] of Object.entries(scores)) {
      if (typeof score !== 'number' || score < 0 || score > 25) {
        scores[field] = Math.max(0, Math.min(25, Number(score) || 0))
      }
    }
    
    // Get token usage if available
    const tokensUsed = result.response.usageMetadata?.totalTokenCount || 0
    
    const evaluationResponse: EvaluationResponse = {
      result: JSON.stringify({
        scores: scores,
        feedback: parsedResult.feedback || 'No feedback provided',
        suggestions: Array.isArray(parsedResult.suggestions) 
          ? parsedResult.suggestions 
          : ['No suggestions provided']
      }),
      tokensUsed
    }
    
    console.log(`Evaluation completed successfully. Tokens used: ${tokensUsed}`)
    
    return new Response(
      JSON.stringify(evaluationResponse),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
    
  } catch (error) {
    console.error('Error in evaluate-essay function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        details: error.toString()
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
