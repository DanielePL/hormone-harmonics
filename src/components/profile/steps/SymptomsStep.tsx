
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SymptomData, getSymptomLabel } from './symptoms/SymptomData';
import { 
  getRecommendedSymptoms, 
  shouldShowRecommendations,
  applyRecommendedSymptoms
} from './symptoms/SymptomRecommendations';
import RecommendationPanel from './symptoms/RecommendationPanel';
import SymptomsList from './symptoms/SymptomsList';
import FactPanel from './symptoms/FactPanel';
import SymptomStepHeader from './symptoms/SymptomStepHeader';
import SymptomStepFooter from './symptoms/SymptomStepFooter';

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

  useEffect(() => {
    const recommended = getRecommendedSymptoms(menopauseStatus);
    setRecommendedSymptoms(recommended);
    
    const shouldShow = shouldShowRecommendations(symptoms);
    setShowRecommendations(shouldShow);
  }, [menopauseStatus, symptoms]);

  const applyRecommendations = () => {
    applyRecommendedSymptoms(symptoms, recommendedSymptoms, handleSymptomToggle);
    setShowRecommendations(false);
  };

  const selectedCount = Object.values(symptoms).filter(Boolean).length;

  return (
    <Card className="border-none shadow-md">
      <SymptomStepHeader />
      
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
      
      <SymptomStepFooter 
        prevStep={prevStep}
        nextStep={nextStep}
        selectedCount={selectedCount}
      />
    </Card>
  );
};

export default SymptomsStep;
