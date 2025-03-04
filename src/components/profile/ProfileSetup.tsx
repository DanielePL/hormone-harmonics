
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import AnimatedCard from '@/components/ui/AnimatedCard';
import StepIndicator from './StepIndicator';
import { MenopauseStatus, ActivityLevel } from '@/utils/types';
import { 
  User, 
  CalendarDays, 
  FileUp, 
  ClipboardCheck, 
  Activity, 
  ArrowRight, 
  ArrowLeft, 
  Check 
} from 'lucide-react';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    activityLevel: 'Moderate' as ActivityLevel,
    menopauseStatus: 'Pre' as MenopauseStatus,
    hasMenstrualCycle: true,
    lastPeriodDate: '',
    hasHormoneProfile: false,
    hasLabReport: false,
    interestedInTesting: false,
    squat: '',
    deadlift: '',
    benchPress: '',
    overhead: '',
    rowWeight: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value === 'yes' }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  
  const prevStep = () => setStep(prev => prev - 1);
  
  const handleComplete = () => {
    toast({
      title: "Profile Created Successfully",
      description: "Your personalized journey begins now!",
      duration: 5000,
    });
    
    // Navigate to dashboard after completion
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const stepLabels = ["About You", "Hormonal Health", "Strength Profile"];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-0">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Create Your Profile
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Let's personalize your experience to provide the most accurate hormone and fitness insights
        </p>
      </div>

      <StepIndicator 
        currentStep={step} 
        totalSteps={3} 
        labels={stepLabels}
      />

      {step === 1 && (
        <AnimatedCard>
          <Card className="border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-rose-100/70 to-pink-100/70 pb-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl tracking-tight">Personal Information</CardTitle>
                  <CardDescription className="mt-1 text-base">
                    Tell us about yourself so we can personalize your experience
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Enter your name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium">Age</Label>
                <Input 
                  id="age" 
                  name="age" 
                  type="number" 
                  placeholder="Enter your age" 
                  value={formData.age}
                  onChange={handleInputChange}
                  className="bg-background/50"
                />
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
                <Label htmlFor="activityLevel" className="text-sm font-medium">Activity Level</Label>
                <Select 
                  value={formData.activityLevel} 
                  onValueChange={(value) => handleSelectChange('activityLevel', value)}
                >
                  <SelectTrigger id="activityLevel" className="bg-background/50">
                    <SelectValue placeholder="Select your activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sedentary">Sedentary (little to no exercise)</SelectItem>
                    <SelectItem value="Light">Light (1-3 days per week)</SelectItem>
                    <SelectItem value="Moderate">Moderate (3-5 days per week)</SelectItem>
                    <SelectItem value="Active">Active (6-7 days per week)</SelectItem>
                    <SelectItem value="Very Active">Very Active (2x per day, intense)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-2 pb-6 px-6">
              <Button 
                onClick={nextStep} 
                className="px-5 gap-2"
                size="lg"
              >
                Continue <ArrowRight size={16} />
              </Button>
            </CardFooter>
          </Card>
        </AnimatedCard>
      )}

      {step === 2 && (
        <AnimatedCard>
          <Card className="border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-rose-100/70 to-pink-100/70 pb-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl tracking-tight">Hormonal Health</CardTitle>
                  <CardDescription className="mt-1 text-base">
                    Helping us understand your hormonal journey
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Menopause Status</Label>
                <Select 
                  value={formData.menopauseStatus} 
                  onValueChange={(value) => handleSelectChange('menopauseStatus', value)}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select your menopause status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pre">Pre-Menopausal</SelectItem>
                    <SelectItem value="Peri">Peri-Menopausal</SelectItem>
                    <SelectItem value="Post">Post-Menopausal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
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
                <div className="mt-2 p-4 border rounded-lg bg-rose-50/50">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardCheck size={20} className="text-primary" />
                    <h4 className="font-medium">Hormone Testing Options</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We offer at-home hormone testing kits or can recommend local testing facilities. We'll provide more information after you complete your profile.
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
                Continue <ArrowRight size={16} />
              </Button>
            </CardFooter>
          </Card>
        </AnimatedCard>
      )}

      {step === 3 && (
        <AnimatedCard>
          <Card className="border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-rose-100/70 to-pink-100/70 pb-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl tracking-tight">Strength Profile</CardTitle>
                  <CardDescription className="mt-1 text-base">
                    Share your current strength levels for personalized recommendations
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="bg-muted/20 p-4 rounded-lg mb-4">
                <p className="text-sm text-muted-foreground">
                  These fields are optional. If you don't know your current strength levels, you can leave them blank
                  and update later. We'll use this information to create personalized workout programs.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="squat" className="text-sm font-medium">Squat (kg)</Label>
                  <Input 
                    id="squat" 
                    name="squat" 
                    type="number" 
                    placeholder="Optional" 
                    value={formData.squat}
                    onChange={handleInputChange}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadlift" className="text-sm font-medium">Deadlift (kg)</Label>
                  <Input 
                    id="deadlift" 
                    name="deadlift" 
                    type="number" 
                    placeholder="Optional" 
                    value={formData.deadlift}
                    onChange={handleInputChange}
                    className="bg-background/50"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="benchPress" className="text-sm font-medium">Bench Press (kg)</Label>
                  <Input 
                    id="benchPress" 
                    name="benchPress" 
                    type="number" 
                    placeholder="Optional" 
                    value={formData.benchPress}
                    onChange={handleInputChange}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overhead" className="text-sm font-medium">Overhead Press (kg)</Label>
                  <Input 
                    id="overhead" 
                    name="overhead" 
                    type="number" 
                    placeholder="Optional" 
                    value={formData.overhead}
                    onChange={handleInputChange}
                    className="bg-background/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rowWeight" className="text-sm font-medium">Row (kg)</Label>
                <Input 
                  id="rowWeight" 
                  name="rowWeight" 
                  type="number" 
                  placeholder="Optional" 
                  value={formData.rowWeight}
                  onChange={handleInputChange}
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2 mt-4">
                <Label htmlFor="notes" className="text-sm font-medium">Additional Notes (Optional)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any other information you'd like us to know about your fitness journey?"
                  className="resize-none bg-background/50 h-20"
                />
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
                onClick={handleComplete}
                className="px-5 gap-2 bg-primary"
                size="lg"
              >
                Complete Profile <Check size={16} />
              </Button>
            </CardFooter>
          </Card>
        </AnimatedCard>
      )}
    </div>
  );
};

export default ProfileSetup;
