import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ClipboardCheck, ArrowRight, ArrowLeft, Sparkles, BadgeCheck } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';

interface SymptomData {
  weightGain: boolean;
  hotFlashes: boolean;
  fatigue: boolean;
  sleepIssues: boolean;
  moodChanges: boolean;
  brainFog: boolean;
  jointPain: boolean;
}

interface SymptomsStepProps {
  symptoms: SymptomData;
  handleSymptomToggle: (symptom: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  menopauseStatus: string;
}

const SymptomsStep = ({ 
  symptoms, 
  handleSymptomToggle, 
  nextStep, 
  prevStep,
  menopauseStatus
}: SymptomsStepProps) => {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendedSymptoms, setRecommendedSymptoms] = useState<string[]>([]);
  const isMobile = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    const getRecommendations = () => {
      let recommended = [];
      
      switch(menopauseStatus) {
        case 'Peri':
          recommended = ['hotFlashes', 'sleepIssues', 'moodChanges'];
          break;
        case 'Post':
          recommended = ['weightGain', 'fatigue', 'jointPain'];
          break;
        case 'Pre':
          recommended = ['moodChanges', 'fatigue'];
          break;
        default:
          recommended = [];
      }
      
      setRecommendedSymptoms(recommended);
      
      const anySelected = Object.values(symptoms).some(Boolean);
      setShowRecommendations(!anySelected);
    };
    
    getRecommendations();
  }, [menopauseStatus, symptoms]);

  const applyRecommendations = () => {
    recommendedSymptoms.forEach(symptom => {
      if (!symptoms[symptom as keyof SymptomData]) {
        handleSymptomToggle(symptom);
      }
    });
    setShowRecommendations(false);
  };

  const selectedCount = Object.values(symptoms).filter(Boolean).length;

  const getSymptomLabel = (key: string): string => {
    const labels: Record<string, string> = {
      weightGain: 'Weight Gain',
      hotFlashes: 'Hot Flashes',
      fatigue: 'Fatigue',
      sleepIssues: 'Sleep Issues',
      moodChanges: 'Mood Changes',
      brainFog: 'Brain Fog',
      jointPain: 'Joint Pain'
    };
    return labels[key] || key;
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-gradient-to-r from-rose-100/70 to-teal-100/70 pb-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-full shadow-sm">
            <ClipboardCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl tracking-tight">Which Symptoms Affect You?</CardTitle>
            <CardDescription className="mt-1 text-base">
              Select all the symptoms you experience regularly
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {showRecommendations && recommendedSymptoms.length > 0 && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mb-4">
            <div className="flex items-start space-x-3">
              <BadgeCheck className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm mb-1">AI Recommendation</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on your menopause status, many women like you commonly experience:
                  {recommendedSymptoms.map(s => ` ${getSymptomLabel(s)},`).join('').slice(0, -1)}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
                  onClick={applyRecommendations}
                >
                  Apply Recommendations
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.keys(symptoms).map((symptomKey) => {
            const isChecked = symptoms[symptomKey as keyof SymptomData];
            const isRecommended = recommendedSymptoms.includes(symptomKey);
            
            return (
              <div 
                key={symptomKey}
                className={cn(
                  "flex items-start space-x-3 p-3 rounded-lg transition-all duration-200",
                  isChecked ? "bg-primary/5 border border-primary/20" : "hover:bg-slate-50"
                )}
              >
                <Checkbox 
                  id={symptomKey} 
                  checked={isChecked}
                  onCheckedChange={() => handleSymptomToggle(symptomKey)}
                  className={cn(
                    "mt-1",
                    isRecommended ? "border-primary" : "",
                    isChecked ? "border-primary" : ""
                  )}
                />
                <div className="grid gap-1">
                  <Label 
                    htmlFor={symptomKey} 
                    className={cn(
                      "text-sm font-medium cursor-pointer",
                      isChecked ? "text-primary" : ""
                    )}
                  >
                    {getSymptomLabel(symptomKey)}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {(() => {
                      switch(symptomKey) {
                        case 'weightGain': return 'Especially around the abdomen';
                        case 'hotFlashes': return 'Sudden feeling of warmth';
                        case 'fatigue': return 'Low energy levels throughout the day';
                        case 'sleepIssues': return 'Trouble falling or staying asleep';
                        case 'moodChanges': return 'Irritability, anxiety, or depression';
                        case 'brainFog': return 'Difficulty concentrating or memory issues';
                        case 'jointPain': return 'Aches and stiffness in joints';
                        default: return '';
                      }
                    })()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 mt-6">
          <div className="flex items-start space-x-3">
            <Sparkles className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm mb-1">Did you know?</h4>
              <p className="text-sm text-muted-foreground">
                Your symptoms are key indicators of specific hormone imbalances. Our AI analyzes these patterns to create targeted solutions.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 pb-6 px-6">
        <Button 
          variant="outline" 
          onClick={prevStep}
          className="gap-2"
        >
          <ArrowLeft size={16} /> Back
        </Button>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {selectedCount} symptoms selected
          </span>
          <Button 
            onClick={nextStep}
            className="px-5 gap-2"
            size="lg"
          >
            Continue <ArrowRight size={16} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SymptomsStep;
