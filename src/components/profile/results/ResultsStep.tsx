
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import AIHormoneAnalysis from './AIHormoneAnalysis';
import PlanPreview from './PlanPreview';
import SubscriptionOptions from './SubscriptionOptions';

interface ResultsStepProps {
  symptoms: {
    weightGain: boolean;
    hotFlashes: boolean;
    fatigue: boolean;
    sleepIssues: boolean;
    moodChanges: boolean;
    brainFog: boolean;
    jointPain: boolean;
  };
  handleComplete: () => void;
}

const ResultsStep = ({ symptoms, handleComplete }: ResultsStepProps) => {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-gradient-to-r from-rose-50 to-teal-50 pb-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary rounded-full shadow-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl tracking-tight font-display">Your AI-Generated Results</CardTitle>
            <CardDescription className="mt-1 text-base">
              Based on your responses, we've created your personalized plan
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <AIHormoneAnalysis symptoms={symptoms} />
        <PlanPreview />
        <SubscriptionOptions />
        
        <div className="text-center">
          <Button 
            variant="link" 
            onClick={handleComplete}
            className="text-muted-foreground font-sans"
          >
            Skip for now and explore the dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsStep;
