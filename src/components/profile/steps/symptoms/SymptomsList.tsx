
import React from 'react';
import SymptomItem from './SymptomItem';
import { SymptomData, getSymptomDescription } from './SymptomData';

interface SymptomsListProps {
  symptoms: SymptomData;
  recommendedSymptoms: string[];
  handleSymptomToggle: (symptom: string) => void;
  getSymptomLabel: (key: string) => string;
}

const SymptomsList = ({ 
  symptoms, 
  recommendedSymptoms, 
  handleSymptomToggle, 
  getSymptomLabel 
}: SymptomsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {Object.keys(symptoms).map((symptomKey) => {
        const isChecked = symptoms[symptomKey as keyof SymptomData];
        const isRecommended = recommendedSymptoms.includes(symptomKey);
        const description = getSymptomDescription(symptomKey);
        
        return (
          <SymptomItem
            key={symptomKey}
            id={symptomKey}
            label={getSymptomLabel(symptomKey)}
            description={description}
            isChecked={isChecked}
            isRecommended={isRecommended}
            onToggle={() => handleSymptomToggle(symptomKey)}
          />
        );
      })}
    </div>
  );
};

export default SymptomsList;
