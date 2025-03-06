
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received request to workout-ai-assistant');
    const { prompt, userProfile } = await req.json();

    if (!deepseekApiKey) {
      console.error('DEEPSEEK_API_KEY is not set');
      throw new Error('DEEPSEEK_API_KEY is not set');
    }

    console.log('Processing workout plan request for user profile:', 
      userProfile ? JSON.stringify(userProfile) : 'No user profile');
    console.log('Prompt received:', prompt.substring(0, 100) + '...');

    const systemPrompt = `You are an expert fitness coach specializing in women's health, 
      particularly for those in perimenopause and menopause. 
      Your expertise is in creating workout plans that optimize hormonal health.
      
      Create detailed, safe, and effective workout plans tailored to the user's specific needs. 
      Always consider their hormonal status, age, current fitness level, and specific goals.
      
      For perimenopause:
      - Focus on maintaining muscle mass with strength training
      - Include moderate-intensity workouts that don't spike cortisol
      - Recommend activities that support bone density
      - Suggest recovery protocols to manage increased inflammation
      
      For menopause:
      - Prioritize resistance training to counteract muscle loss
      - Include weight-bearing exercises for bone health
      - Suggest cardio that's gentle on joints
      - Include mobility work to maintain flexibility
      
      Format your response in a clear, encouraging, and easy-to-follow way.
      Use markdown formatting for better readability. Include specific exercises, sets, reps, 
      and rest periods where appropriate.`;

    console.log('Making request to Deepseek API');
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepseekApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Deepseek API error:', errorData);
      throw new Error(`Deepseek API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    console.log('Successfully generated workout plan');
    console.log('First 100 characters of response:', generatedText.substring(0, 100) + '...');

    return new Response(JSON.stringify({ generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in workout-ai-assistant function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
