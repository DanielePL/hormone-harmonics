
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import TestResultItem from './TestResultItem';

const HormonePanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hormone Panel</CardTitle>
        <CardDescription>
          Your latest hormone levels from May 15, 2023
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <TestResultItem 
            name="Estrogen (Estradiol)" 
            value={35} 
            unit="pg/ml" 
            range="30-400" 
            status="normal" 
            info="Estradiol levels in postmenopausal range, supporting your current phase."
          />
          <TestResultItem 
            name="Progesterone" 
            value={0.3} 
            unit="ng/ml" 
            range="0.1-0.8" 
            status="normal" 
            info="Progesterone levels are in the expected postmenopausal range."
          />
          <TestResultItem 
            name="Testosterone (Total)" 
            value={18} 
            unit="ng/dl" 
            range="15-70" 
            status="normal" 
            info="Total testosterone is in the normal range for your age."
          />
          <TestResultItem 
            name="Cortisol (Morning)" 
            value={22} 
            unit="μg/dl" 
            range="5-23" 
            status="high" 
            info="Morning cortisol is on the higher end, which may impact energy and recovery."
          />
          <TestResultItem 
            name="TSH" 
            value={3.8} 
            unit="mIU/L" 
            range="0.4-4.0" 
            status="borderline" 
            info="TSH is on the higher end of normal, suggesting potential subclinical hypothyroidism."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default HormonePanel;
