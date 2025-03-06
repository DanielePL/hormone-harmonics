
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Send, Dumbbell } from 'lucide-react';
import { UserProfile } from '@/utils/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

interface AIWorkoutAssistantProps {
  userProfile?: UserProfile;
}

const AIWorkoutAssistant: React.FC<AIWorkoutAssistantProps> = ({ userProfile }) => {
  const [prompt, setPrompt] = useState('');
  const [workoutPlan, setWorkoutPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getWorkoutPlan = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Input required",
        description: "Please enter your workout goals or needs first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Create an enhanced prompt with specific instructions
      const enhancedPrompt = `Create a personalized workout routine based on the following request: "${prompt}"
      
My profile details:
${userProfile ? `
- Age: ${userProfile.age}
- Current fitness level: ${userProfile.activityLevel}
- Menopause status: ${userProfile.menopauseStatus}
` : 'No profile information available.'}

IMPORTANT: Focus ONLY on providing a structured workout routine with specific exercises, sets, reps, and frequency. Include warm-up and cool-down recommendations. Format your response with clear headings and bullet points.`;

      const { data, error } = await supabase.functions.invoke('workout-ai-assistant', {
        body: { 
          prompt: enhancedPrompt, 
          userProfile 
        },
      });

      if (error) {
        console.error('Error getting workout plan:', error);
        setError('Failed to generate workout plan. Please try again.');
        toast({
          title: "Error",
          description: "Failed to generate workout plan. Please try again.",
          variant: "destructive",
        });
      } else {
        setWorkoutPlan(data.generatedText);
      }
    } catch (err) {
      console.error('Exception getting workout plan:', err);
      setError('An unexpected error occurred. Please try again.');
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-pink-100">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-pink-500" />
            <CardTitle className="text-xl text-pink-700">AI Workout Planner</CardTitle>
          </div>
          <CardDescription>
            Get a personalized workout routine based on your needs, goals, and hormonal health
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">What kind of workout routine do you need?</p>
            <Textarea
              placeholder="E.g., I need a 3-day strength training plan focused on building muscle mass, or I want a routine that's gentle on my joints..."
              className="min-h-[100px] resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                Be specific about your goals, preferences, and any limitations
              </p>
              <Button 
                onClick={getWorkoutPlan} 
                disabled={isLoading || !prompt.trim()}
                className="bg-pink-600 hover:bg-pink-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Dumbbell className="mr-2 h-4 w-4" />
                    Get Workout Plan
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {workoutPlan && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Dumbbell size={18} className="text-pink-500" />
              Your Personalized Workout Plan
            </CardTitle>
            <CardDescription>
              Generated on {format(new Date(), 'MMMM d, yyyy')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-pink max-w-none">
              <div dangerouslySetInnerHTML={{ __html: workoutPlan.replace(/\n/g, '<br />') }} />
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIWorkoutAssistant;
