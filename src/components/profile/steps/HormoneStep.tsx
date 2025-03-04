
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { LineChart, CalendarDays, FileUp, ArrowLeft, Sparkles, ClipboardCheck } from 'lucide-react';

interface HormoneStepProps {
  formData: {
    hasMenstrualCycle: boolean;
    lastPeriodDate: string;
    hasHormoneProfile: boolean;
    hasLabReport: boolean;
    interestedInTesting: boolean;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRadioChange: (name: string, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const HormoneStep = ({
  formData,
  handleInputChange,
  handleRadioChange,
  nextStep,
  prevStep
}: HormoneStepProps) => {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-gradient-to-r from-rose-100/70 to-teal-100/70 pb-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-full shadow-sm">
            <LineChart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl tracking-tight">Hormone Information</CardTitle>
            <CardDescription className="mt-1 text-base">
              Tell us about your hormonal history for more personalized insights
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 pt-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Do you still have a menstrual cycle?</Label>
          <RadioGroup 
            defaultValue={formData.hasMenstrualCycle ? "yes" : "no"}
            onValueChange={(value) => handleRadioChange('hasMenstrualCycle', value)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="has-cycle-yes" />
              <Label htmlFor="has-cycle-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="has-cycle-no" />
              <Label htmlFor="has-cycle-no">No</Label>
            </div>
          </RadioGroup>
        </div>
        
        {formData.hasMenstrualCycle && (
          <div className="space-y-2">
            <Label htmlFor="lastPeriodDate" className="text-sm font-medium">Date of Last Period</Label>
            <div className="relative">
              <Input 
                id="lastPeriodDate" 
                name="lastPeriodDate" 
                type="date" 
                value={formData.lastPeriodDate}
                onChange={handleInputChange}
                className="pl-10 bg-background/50"
              />
              <CalendarDays className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        )}

        <div className="space-y-2 mt-4">
          <Label className="text-sm font-medium">Do you know your hormone profile?</Label>
          <RadioGroup 
            defaultValue={formData.hasHormoneProfile ? "yes" : "no"}
            onValueChange={(value) => handleRadioChange('hasHormoneProfile', value)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="has-hormone-yes" />
              <Label htmlFor="has-hormone-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="has-hormone-no" />
              <Label htmlFor="has-hormone-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.hasHormoneProfile && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Do you have a lab report of your hormone profile?</Label>
            <RadioGroup 
              defaultValue={formData.hasLabReport ? "yes" : "no"}
              onValueChange={(value) => handleRadioChange('hasLabReport', value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="has-lab-yes" />
                <Label htmlFor="has-lab-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="has-lab-no" />
                <Label htmlFor="has-lab-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {formData.hasHormoneProfile && formData.hasLabReport && (
          <div className="mt-4 p-4 border rounded-lg bg-rose-50/50">
            <div className="flex items-center gap-2 mb-2">
              <FileUp size={20} className="text-primary" />
              <h4 className="font-medium">Upload Lab Results</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Upload your hormone lab results to receive personalized workout and nutrition recommendations
            </p>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 bg-white">
              <FileUp size={16} />
              Upload Lab Report
            </Button>
          </div>
        )}

        {!formData.hasHormoneProfile && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Would you be interested in hormone testing?</Label>
            <RadioGroup 
              defaultValue={formData.interestedInTesting ? "yes" : "no"}
              onValueChange={(value) => handleRadioChange('interestedInTesting', value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="testing-yes" />
                <Label htmlFor="testing-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="testing-no" />
                <Label htmlFor="testing-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {!formData.hasHormoneProfile && formData.interestedInTesting && (
          <div className="mt-2 p-4 border rounded-lg bg-blue-50/50">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardCheck size={20} className="text-blue-500" />
              <h4 className="font-medium">Hormone Testing Options</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              We offer at-home hormone testing kits that are 92% as accurate as clinical labs. We'll include more information with your results.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2 pb-6 px-6">
        <Button 
          variant="outline" 
          onClick={prevStep}
          className="gap-2"
        >
          <ArrowLeft size={16} /> Back
        </Button>
        <Button 
          onClick={nextStep}
          className="px-5 gap-2"
          size="lg"
        >
          Get My Results <Sparkles size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HormoneStep;
