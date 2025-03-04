
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import InsightPanel from '@/components/ui/InsightPanel';
import AnimatedCard from '@/components/ui/AnimatedCard';

const ProgressTracker = () => {
  return (
    <AnimatedCard>
      <Card>
        <CardHeader>
          <CardTitle>Strength Progress Tracker</CardTitle>
          <CardDescription>Monitor your gains and achieve your strength goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="sm">Squat</Button>
              <Button variant="outline" size="sm">Deadlift</Button>
              <Button variant="outline" size="sm">Bench Press</Button>
              <Button variant="outline" size="sm">Overhead Press</Button>
              <Button variant="outline" size="sm">Row</Button>
              <Button variant="outline" size="sm">+ Add Exercise</Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Squat Progress</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Current 1RM (Estimated)</span>
                  <span className="text-sm font-medium">85 kg</span>
                </div>
                
                <div className="h-40">
                  {/* Progress chart would go here */}
                  <div className="w-full h-full flex items-center justify-center bg-secondary rounded-md">
                    <span className="text-muted-foreground">Strength progress chart</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Highest Weight</span>
                    <p className="text-sm font-medium">80 kg x 3 reps</p>
                    <span className="text-xs text-muted-foreground">Feb 25, 2023</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Most Recent</span>
                    <p className="text-sm font-medium">75 kg x 5 reps</p>
                    <span className="text-xs text-muted-foreground">Mar 15, 2023</span>
                  </div>
                </div>
                
                <InsightPanel
                  type="info"
                  title="Hormonal Impact"
                  description="Your strength tends to peak during days 5-12 of your cycle when estrogen begins to rise and progesterone is low."
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedCard>
  );
};

export default ProgressTracker;
