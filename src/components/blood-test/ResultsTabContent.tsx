
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import ResultsTab from './ResultsTab';
import TrendsTab from './TrendsTab';
import RecommendationsTab from './RecommendationsTab';

const ResultsTabContent = ({ activeTab }: { activeTab: string }) => {
  return (
    <>
      <TabsContent value="results" className="space-y-6">
        <ResultsTab />
      </TabsContent>
      
      <TabsContent value="trends">
        <TrendsTab />
      </TabsContent>
      
      <TabsContent value="recommendations">
        <RecommendationsTab />
      </TabsContent>
    </>
  );
};

export default ResultsTabContent;
