
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UploadSection from '@/components/blood-test/UploadSection';
import ResultsTabContent from '@/components/blood-test/ResultsTabContent';
import SidePanel from '@/components/blood-test/SidePanel';

const BloodTestAnalysis = () => {
  const [activeTab, setActiveTab] = useState('results');
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileUpload = (e: React.FormEvent) => {
    // This would handle the file upload in a real implementation
    e.preventDefault();
    setFileUploaded(true);
  };

  return (
    <div className="container p-4 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blood Test Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Upload your lab results for personalized insights and recommendations
          </p>
        </div>
      </div>

      {!fileUploaded ? (
        <UploadSection onUpload={handleFileUpload} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <ResultsTabContent activeTab={activeTab} />
            </Tabs>
          </div>

          <div>
            <SidePanel />
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodTestAnalysis;
