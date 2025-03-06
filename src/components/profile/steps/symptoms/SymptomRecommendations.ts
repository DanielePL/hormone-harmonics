
import { SymptomData } from './SymptomData';

export const getRecommendedSymptoms = (menopauseStatus: string): string[] => {
  let recommended: string[] = [];
  
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
  
  return recommended;
};

export const shouldShowRecommendations = (symptoms: SymptomData): boolean => {
  return !Object.values(symptoms).some(Boolean);
};

export const applyRecommendedSymptoms = (
  symptoms: SymptomData,
  recommendedSymptoms: string[],
  handleSymptomToggle: (symptom: string) => void
): void => {
  recommendedSymptoms.forEach(symptom => {
    if (!symptoms[symptom as keyof SymptomData]) {
      handleSymptomToggle(symptom);
    }
  });
};
