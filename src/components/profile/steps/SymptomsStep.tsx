
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ClipboardCheck, ArrowRight, ArrowLeft, Sparkles, BadgeCheck } from 'lucide-react';

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

  // Generate AI-powered recommendations based on menopause status
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
      
      // Only show recommendations if no symptoms are selected yet
      const anySelected = Object.values(symptoms).some(Boolean);
      setShowRecommendations(!anySelected);
    };
    
    getRecommendations();
  }, [menopauseStatus, symptoms]);

  // Apply recommended symptoms
  const applyRecommendations = () => {
    recommendedSymptoms.forEach(symptom => {
      if (!symptoms[symptom as keyof SymptomData]) {
        handleSymptomToggle(symptom);
      }
    });
    setShowRecommendations(false);
  };
  
  // Count selected symptoms
  const selectedCount = Object.values(symptoms).filter(Boolean).length;

  // Get readable symptom name
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="weightGain" 
              checked={symptoms.weightGain}
              onCheckedChange={() => handleSymptomToggle('weightGain')}
              className={`mt-1 ${recommendedSymptoms.includes('weightGain') ? 'border-primary' : ''}`}
            />
            <div className="grid gap-1.5">
              <Label htmlFor="weightGain" className="text-sm font-medium">Weight Gain</Label>
              <p className="text-xs text-muted-foreground">Especially around the abdomen</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="hotFlashes" 
              checked={symptoms.hotFlashes}
              onCheckedChange={() => handleSymptomToggle('hotFlashes')}
              className={`mt-1 ${recommendedSymptoms.includes('hotFlashes') ? 'border-primary' : ''}`}
            />
            <div className="grid gap-1.5">
              <Label htmlFor="hotFlashes" className="text-sm font-medium">Hot Flashes</Label>
              <p className="text-xs text-muted-foreground">Sudden feeling of warmth</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="fatigue"
              checked={symptoms.fatigue}
              onCheckedChange={() => handleSymptomToggle('fatigue')}
              className={`mt-1 ${recommendedSymptoms.includes('fatigue') ? 'border-primary' : ''}`}
            />
            <div className="grid gap-1.5">
              <Label htmlFor="fatigue" className="text-sm font-medium">Fatigue</Label>
              <p className="text-xs text-muted-foreground">Low energy levels throughout the day</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="sleepIssues"
              checked={symptoms.sleepIssues}
              onCheckedChange={() => handleSymptomToggle('sleepIssues')}
              className={`mt-1 ${recommendedSymptoms.includes('sleepIssues') ? 'border-primary' : ''}`}
            />
            <div className="grid gap-1.5">
              <Label htmlFor="sleepIssues" className="text-sm font-medium">Sleep Issues</Label>
              <p className="text-xs text-muted-foreground">Trouble falling or staying asleep</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="moodChanges"
              checked={symptoms.moodChanges}
              onCheckedChange={() => handleSymptomToggle('moodChanges')}
              className={`mt-1 ${recommendedSymptoms.includes('moodChanges') ? 'border-primary' : ''}`}
            />
            <div className="grid gap-1.5">
              <Label htmlFor="moodChanges" className="text-sm font-medium">Mood Changes</Label>
              <p className="text-xs text-muted-foreground">Irritability, anxiety, or depression</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="brainFog"
              checked={symptoms.brainFog}
              onCheckedChange={() => handleSymptomToggle('brainFog')}
              className={`mt-1 ${recommendedSymptoms.includes('brainFog') ? 'border-primary' : ''}`}
            />
            <div className="grid gap-1.5">
              <Label htmlFor="brainFog" className="text-sm font-medium">Brain Fog</Label>
              <p className="text-xs text-muted-foreground">Difficulty concentrating or memory issues</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="jointPain"
              checked={symptoms.jointPain}
              onCheckedChange={() => handleSymptomToggle('jointPain')}
              className={`mt-1 ${recommendedSymptoms.includes('jointPain') ? 'border-primary' : ''}`}
            />
            <div className="grid gap-1.5">
              <Label htmlFor="jointPain" className="text-sm font-medium">Joint Pain</Label>
              <p className="text-xs text-muted-foreground">Aches and stiffness in joints</p>
            </div>
          </div>
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
