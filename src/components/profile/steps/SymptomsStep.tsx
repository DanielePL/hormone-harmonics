
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { SymptomData, getSymptomLabel } from './symptoms/SymptomData';
import RecommendationPanel from './symptoms/RecommendationPanel';
import SymptomsList from './symptoms/SymptomsList';
import FactPanel from './symptoms/FactPanel';

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
          <RecommendationPanel
            recommendedSymptoms={recommendedSymptoms}
            getSymptomLabel={getSymptomLabel}
            onApply={applyRecommendations}
          />
        )}

        <SymptomsList
          symptoms={symptoms}
          recommendedSymptoms={recommendedSymptoms}
          handleSymptomToggle={handleSymptomToggle}
          getSymptomLabel={getSymptomLabel}
        />

        <FactPanel />
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
