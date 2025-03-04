
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UploadSection from '@/components/blood-test/UploadSection';
import ResultsTabContent from '@/components/blood-test/ResultsTabContent';
import SidePanel from '@/components/blood-test/SidePanel';
import { toast } from "sonner";
import { FileText } from 'lucide-react';

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Blood Test Analysis</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Upload your lab results for personalized insights and recommendations
          </p>
        </div>
        
        {fileUploaded && (
          <div className="px-5 py-3 bg-primary/10 rounded-md flex items-center shadow-sm">
            <FileText className="w-5 h-5 text-primary mr-2" />
            <span className="font-medium text-primary">Current file: </span>
            <span className="ml-2 text-foreground">{uploadedFileName}</span>
            <button 
              onClick={() => setFileUploaded(false)} 
              className="ml-4 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Replace
            </button>
          </div>
        )}
      </div>

      {!fileUploaded ? (
        <UploadSection onUpload={handleFileUpload} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
                <TabsTrigger value="results" className="text-base">Results</TabsTrigger>
                <TabsTrigger value="trends" className="text-base">Trends</TabsTrigger>
                <TabsTrigger value="recommendations" className="text-base">Recommendations</TabsTrigger>
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
