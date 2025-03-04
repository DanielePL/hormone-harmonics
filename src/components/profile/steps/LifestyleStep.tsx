
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Activity, ArrowRight, ArrowLeft, LineChart } from 'lucide-react';

interface LifestyleStepProps {
  formData: {
    currentlyTracking: boolean;
    fitnessLevel: string;
    weight: string;
    height: string;
    readyForChange: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRadioChange: (name: string, value: string) => void;
  handleFitnessLevelChange: (value: string) => void;
  handleReadinessChange: (value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const LifestyleStep = ({
  formData,
  handleInputChange,
  handleRadioChange,
  handleFitnessLevelChange,
  handleReadinessChange,
  nextStep,
  prevStep
}: LifestyleStepProps) => {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-gradient-to-r from-rose-100/70 to-teal-100/70 pb-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-full shadow-sm">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl tracking-tight">Quick Lifestyle Assessment</CardTitle>
            <CardDescription className="mt-1 text-base">
              Help us understand your current health practices
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Are you currently tracking your hormones?</Label>
          <RadioGroup 
            defaultValue={formData.currentlyTracking ? "yes" : "no"}
            onValueChange={(value) => handleRadioChange('currentlyTracking', value)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="tracking-yes" />
              <Label htmlFor="tracking-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="tracking-no" />
              <Label htmlFor="tracking-no">No</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">Do you currently follow a fitness plan?</Label>
          <RadioGroup 
            value={formData.fitnessLevel}
            onValueChange={handleFitnessLevelChange}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Yes" id="fitness-yes" />
              <Label htmlFor="fitness-yes">Yes, regularly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Somewhat" id="fitness-somewhat" />
              <Label htmlFor="fitness-somewhat">Somewhat, but not consistently</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="No" id="fitness-no" />
              <Label htmlFor="fitness-no">No, not currently</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-sm font-medium">Weight (kg)</Label>
            <Input 
              id="weight" 
              name="weight" 
              type="number" 
              placeholder="Weight in kg" 
              value={formData.weight}
              onChange={handleInputChange}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height" className="text-sm font-medium">Height (cm)</Label>
            <Input 
              id="height" 
              name="height" 
              type="number" 
              placeholder="Height in cm" 
              value={formData.height}
              onChange={handleInputChange}
              className="bg-background/50"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">How serious are you about finding a solution?</Label>
          <RadioGroup 
            value={formData.readyForChange}
            onValueChange={handleReadinessChange}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Ready" id="change-ready" />
              <Label htmlFor="change-ready">I'm ready to take action now!</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Considering" id="change-considering" />
              <Label htmlFor="change-considering">I'm considering my options</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Just exploring" id="change-exploring" />
              <Label htmlFor="change-exploring">Just exploring for now</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-200 mt-6">
          <div className="flex items-start space-x-3">
            <LineChart className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm mb-1">You're making progress!</h4>
              <p className="text-sm text-muted-foreground">
                92% of women who complete this assessment see improvements in their symptoms within 30 days of following their personalized plan.
              </p>
            </div>
          </div>
        </div>
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
          Continue <ArrowRight size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LifestyleStep;
