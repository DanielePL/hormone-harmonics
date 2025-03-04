
import React from 'react';
import { Upload, FileText, Info } from 'lucide-react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Card, CardContent } from '@/components/ui/card';

interface UploadSectionProps {
  onUpload: (e: React.FormEvent) => void;
}

const UploadSection = ({ onUpload }: UploadSectionProps) => {
  return (
    <div className="max-w-3xl mx-auto">
      <AnimatedCard className="p-8 border-2 border-dashed border-border rounded-xl">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Upload size={28} className="text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Upload Your Blood Test Results</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Drag and drop your PDF or CSV file, or click to browse. We support major lab formats 
            including Quest, LabCorp, and more.
          </p>
          
          <div className="pt-4">
            <form onSubmit={onUpload}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-5 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <FileText size={18} />
                  Upload Lab Results
                </button>
                <button 
                  type="button"
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium px-5 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Info size={18} />
                  See Supported Formats
                </button>
              </div>
            </form>
          </div>
          
          <div className="pt-6 pb-2">
            <p className="text-sm text-muted-foreground">
              Your data is encrypted and never shared. Learn more about our {" "}
              <a href="#" className="text-primary hover:underline">privacy policy</a>.
            </p>
          </div>
        </div>
      </AnimatedCard>
      
      <div className="mt-8 grid sm:grid-cols-3 gap-6">
        <Card className="bg-background">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <FileText size={20} className="text-primary" />
              </div>
              <h4 className="font-medium">Upload Lab Results</h4>
              <p className="text-sm text-muted-foreground">
                We analyze 50+ markers to generate insights
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-background">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Upload size={20} className="text-primary" />
              </div>
              <h4 className="font-medium">Get Insights</h4>
              <p className="text-sm text-muted-foreground">
                AI analyzes your results for key health patterns
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-background">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <FileText size={20} className="text-primary" />
              </div>
              <h4 className="font-medium">Personalized Plan</h4>
              <p className="text-sm text-muted-foreground">
                Receive custom fitness & nutrition recommendations
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadSection;
