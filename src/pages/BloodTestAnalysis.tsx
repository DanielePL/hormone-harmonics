
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UploadSection from '@/components/blood-test/UploadSection';
import ResultsTabContent from '@/components/blood-test/ResultsTabContent';
import SidePanel from '@/components/blood-test/SidePanel';
import { toast } from "sonner";

const BloodTestAnalysis = () => {
  const [activeTab, setActiveTab] = useState('results');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name);
    setUploadedFileName(file.name);
    setFileUploaded(true);
    toast.success(`File "${file.name}" successfully uploaded`);
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
        
        {fileUploaded && (
          <div className="px-4 py-2 bg-primary/10 rounded-md flex items-center">
            <span className="font-medium text-primary">Current file: </span>
            <span className="ml-2">{uploadedFileName}</span>
            <button 
              onClick={() => setFileUploaded(false)} 
              className="ml-3 text-sm underline text-muted-foreground hover:text-primary transition-colors"
            >
              Replace
            </button>
          </div>
        )}
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
