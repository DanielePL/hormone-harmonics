
export interface SymptomData {
  weightGain: boolean;
  hotFlashes: boolean;
  fatigue: boolean;
  sleepIssues: boolean;
  moodChanges: boolean;
  brainFog: boolean;
  jointPain: boolean;
}

export const getSymptomLabel = (key: string): string => {
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

export const getSymptomDescription = (symptomKey: string): string => {
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
};
