
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecordDataTab from './hormone/RecordDataTab';
import HormoneTrendsTab from './hormone/HormoneTrendsTab';
import SymptomTrackingTab from './hormone/SymptomTrackingTab';

const HormoneTracker = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hormone Tracking</h1>
        <p className="text-muted-foreground">Monitor and log your hormone levels and related symptoms</p>
      </div>

      <Tabs defaultValue="log" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger 
            value="log" 
            className="text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium"
          >
            Record Data
          </TabsTrigger>
          <TabsTrigger 
            value="trends" 
            className="text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium"
          >
            Hormone Trends
          </TabsTrigger>
          <TabsTrigger 
            value="symptoms" 
            className="text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium"
          >
            Symptom Tracking
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="log" className="mt-4 space-y-4">
          <RecordDataTab />
        </TabsContent>
        
        <TabsContent value="trends" className="mt-4">
          <HormoneTrendsTab />
        </TabsContent>
        
        <TabsContent value="symptoms" className="mt-4">
          <SymptomTrackingTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HormoneTracker;
