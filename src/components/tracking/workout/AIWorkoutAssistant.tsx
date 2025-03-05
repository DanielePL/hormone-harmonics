
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Send, Dumbbell } from 'lucide-react';
import { UserProfile } from '@/utils/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface AIWorkoutAssistantProps {
  userProfile?: UserProfile;
}

const AIWorkoutAssistant = ({ userProfile }: AIWorkoutAssistantProps) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<{role: 'user' | 'assistant', content: string}[]>([]);

  const generateWorkoutPlan = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    const fullPrompt = `Based on the following information about me: 
    - Age: ${userProfile?.age || 'Not specified'}
    - Weight: ${userProfile?.weight || 'Not specified'} kg
    - Height: ${userProfile?.height || 'Not specified'} cm
    - Menopause status: ${userProfile?.menopauseStatus || 'Not specified'}
    - Activity level: ${userProfile?.activityLevel || 'Not specified'}
    
    ${prompt}
    
    Please provide a detailed workout plan that is optimized for my hormonal health.`;

    try {
      const newUserMessage = { role: 'user' as const, content: prompt };
      const newHistory = [...history, newUserMessage];
      setHistory(newHistory);
      setPrompt('');

      const { data, error } = await supabase.functions.invoke('workout-ai-assistant', {
        body: { prompt: fullPrompt, userProfile },
      });

      if (error) throw error;

      const aiResponse = data.generatedText || "I couldn't generate a workout plan. Please try again.";
      setResponse(aiResponse);
      setHistory([...newHistory, { role: 'assistant' as const, content: aiResponse }]);
    } catch (error) {
      console.error('Error generating workout plan:', error);
      toast({
        title: "Error",
        description: "Failed to generate workout plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 pb-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 backdrop-blur-sm rounded-full shadow-sm">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl tracking-tight">AI Workout Assistant</CardTitle>
            <CardDescription className="mt-1 text-base">
              Get personalized workout recommendations based on your hormonal profile
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Chat history */}
        {history.length > 0 && (
          <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto pr-2">
            {history.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground ml-4' 
                      : 'bg-muted border border-border mr-4'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Initial state message */}
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Dumbbell className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-medium text-lg">Your Personal Workout Coach</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Ask me to create a personalized workout plan based on your hormonal profile, or specific goals you have.
            </p>
          </div>
        )}

        {/* Input area */}
        <div className="flex flex-col space-y-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask for workout advice, e.g. 'Create a 3-day split for building strength' or 'I want a workout plan for my high energy days'"
            className="resize-none min-h-[100px] form-field-validated border-0 shadow-sm focus:shadow-md"
          />
          <Button 
            onClick={generateWorkoutPlan} 
            disabled={isLoading || !prompt.trim()} 
            className="self-end px-6"
            variant="gradient"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Get Workout Plan
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIWorkoutAssistant;
