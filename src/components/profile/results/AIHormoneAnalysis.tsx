
import React from 'react';
import InsightPanel from '@/components/ui/InsightPanel';
import { Brain } from 'lucide-react';

interface AIHormoneAnalysisProps {
  symptoms: {
    weightGain: boolean;
    hotFlashes: boolean;
    fatigue: boolean;
    sleepIssues: boolean;
    moodChanges: boolean;
    brainFog: boolean;
    jointPain: boolean;
  };
}

const AIHormoneAnalysis = ({ symptoms }: AIHormoneAnalysisProps) => {
  const hasSymptomData = Object.values(symptoms).some(value => value);
  const symptomCount = Object.values(symptoms).filter(v => v).length;

  return (
    <div className="p-4 rounded-lg border bg-blue-50/30 mb-4">
      <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
        <Brain className="h-5 w-5 text-primary" /> AI Hormone Analysis
      </h3>
      
      {hasSymptomData ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Based on your {symptomCount} reported symptoms, our AI has identified potential hormonal imbalances:
          </p>
          
          <div className="grid gap-3">
            {(symptoms.hotFlashes || symptoms.sleepIssues || symptoms.moodChanges) && (
              <InsightPanel
                type="high"
                title="Possible Estrogen Imbalance"
                insights={[
                  "Your hot flashes, sleep issues, and mood changes suggest fluctuating estrogen levels",
                  "This can impact energy levels and recovery",
                  "Our plan addresses this with targeted exercise and nutrition"
                ]}
              />
            )}
            
            {(symptoms.weightGain || symptoms.fatigue) && (
              <InsightPanel
                type="high"
                title="Cortisol Management Needed"
                insights={[
                  "Weight gain and fatigue can be linked to elevated cortisol levels",
                  "Stress hormones may be affecting your metabolism",
                  "Our plan includes stress reduction and metabolic support"
                ]}
              />
            )}
            
            {(symptoms.brainFog || symptoms.jointPain) && (
              <InsightPanel
                type="high"
                title="Inflammation Signals"
                insights={[
                  "Brain fog and joint pain can indicate elevated inflammation",
                  "This can be triggered by hormone fluctuations",
                  "Anti-inflammatory strategies are included in your plan"
                ]}
              />
            )}
          </div>
          
          <p className="text-xs text-muted-foreground italic mt-2">
            Note: This is not a medical diagnosis. For a complete assessment, we recommend hormone testing.
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          To receive a detailed hormone analysis, please go back and select the symptoms you experience.
        </p>
      )}
    </div>
  );
};

export default AIHormoneAnalysis;
