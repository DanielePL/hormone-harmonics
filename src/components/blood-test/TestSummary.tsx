
import React from 'react';
import { Progress } from '@/components/ui/progress';
import AnimatedCard from '@/components/ui/AnimatedCard';

const TestSummary = () => {
  return (
    <AnimatedCard className="p-6 bg-background border border-border shadow-sm rounded-xl">
      <h3 className="text-xl font-semibold mb-4">Test Summary</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Optimal</span>
            <span className="text-sm text-muted-foreground">4 markers</span>
          </div>
          <Progress value={40} className="bg-insight-optimal h-2" indicatorClassName="bg-green-500" />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Borderline</span>
            <span className="text-sm text-muted-foreground">3 markers</span>
          </div>
          <Progress value={30} className="bg-insight-high h-2" indicatorClassName="bg-yellow-500" />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Out of Range</span>
            <span className="text-sm text-muted-foreground">3 markers</span>
          </div>
          <Progress value={30} className="bg-insight-low h-2" indicatorClassName="bg-red-500" />
        </div>
      </div>
    </AnimatedCard>
  );
};

export default TestSummary;
