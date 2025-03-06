
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

    console.log('Processing workout routine request for user profile:', 
      userProfile ? JSON.stringify(userProfile) : 'No user profile');
    console.log('Prompt received:', prompt.substring(0, 100) + '...');

    const systemPrompt = `You are a professional fitness coach specializing in creating workout routines 
      specifically for women in different hormonal phases, particularly perimenopause and menopause.
      
      Your ONLY task is to create detailed, structured workout routines that are:
      1. Specific - Include exact exercises, sets, reps, rest periods, and weekly schedule
      2. Safe - Appropriate for the user's fitness level and hormonal status
      3. Evidence-based - Optimized for hormonal health
      
      For perimenopause:
      - Focus on maintaining muscle mass with strength training (2-3x/week)
      - Include moderate-intensity cardio that doesn't spike cortisol
      - Add exercises for core and pelvic floor strength
      
      For menopause:
      - Prioritize resistance training (2-3x/week) to counteract muscle loss
      - Include weight-bearing exercises for bone health
      - Suggest appropriate cardio for heart health (moderate intensity)
      
      Your response must ONLY be a workout routine. Do not include any general health advice, 
      nutrition recommendations, or other information not directly related to the exercise plan.
      
      Format your response with clear headings and bullet points for easy readability.`;

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

    console.log('Successfully generated workout routine');
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
