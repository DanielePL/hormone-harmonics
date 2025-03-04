
import React from 'react';
import TestSummary from './TestSummary';
import InsightPanel from '@/components/ui/InsightPanel';
import NextStepsCard from './NextStepsCard';

const SidePanel = () => {
  return (
    <div className="space-y-6">
      <TestSummary />
      
      <InsightPanel 
        title="AI Analysis" 
        insights={[
          "Your cortisol and blood sugar patterns suggest HPA axis dysregulation.",
          "Thyroid function borderline—monitor for potential medication needs.",
          "Good HDL levels indicate effective cardiovascular protection.",
          "Consider strength training to improve metabolic markers."
        ]}
      />

      <NextStepsCard />
    </div>
  );
};

export default SidePanel;
