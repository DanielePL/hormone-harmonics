
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import TestResultItem from './TestResultItem';

const MetabolicPanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Metabolic Health</CardTitle>
        <CardDescription>
          Key metabolic markers from your latest blood test
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <TestResultItem 
            name="Fasting Glucose" 
            value={95} 
            unit="mg/dl" 
            range="70-99" 
            status="borderline" 
            info="Fasting glucose is at the upper end of normal range."
          />
          <TestResultItem 
            name="HbA1c" 
            value={5.6} 
            unit="%" 
            range="<5.7" 
            status="borderline" 
            info="HbA1c indicates pre-diabetic range. Consider dietary modifications."
          />
          <TestResultItem 
            name="Total Cholesterol" 
            value={210} 
            unit="mg/dl" 
            range="<200" 
            status="high" 
            info="Cholesterol is slightly elevated above recommended levels."
          />
          <TestResultItem 
            name="HDL" 
            value={65} 
            unit="mg/dl" 
            range=">50" 
            status="optimal" 
            info="HDL (good cholesterol) is at a healthy level, providing cardiovascular protection."
          />
          <TestResultItem 
            name="LDL" 
            value={125} 
            unit="mg/dl" 
            range="<100" 
            status="high" 
            info="LDL is above optimal levels. Consider diet and lifestyle adjustments."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MetabolicPanel;
