
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from "@/hooks/use-toast";
import AnimatedCard from '@/components/ui/AnimatedCard';
import StepIndicator from './StepIndicator';
import InsightPanel from '@/components/ui/InsightPanel';
import { 
  User, 
  CalendarDays, 
  FileUp, 
  ClipboardCheck, 
  Activity, 
  ArrowRight, 
  ArrowLeft, 
  Check,
  Sparkles,
  LineChart,
  Flame,
  Brain,
  Utensils,
  Heart
} from 'lucide-react';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    weight: '',
    height: '',
    activityLevel: 'Moderate',
    menopauseStatus: 'Peri',
    symptoms: {
      weightGain: false,
      hotFlashes: false,
      fatigue: false,
      sleepIssues: false,
      moodChanges: false,
      brainFog: false,
      jointPain: false,
    },
    currentlyTracking: false,
    fitnessLevel: 'Somewhat',
    readyForChange: 'Ready',
    hasMenstrualCycle: false,
    lastPeriodDate: '',
    hasHormoneProfile: false,
    hasLabReport: false,
    interestedInTesting: false,
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

  const handleReadinessChange = (value: string) => {
    setFormData(prev => ({ ...prev, readyForChange: value }));
  };

  const handleFitnessLevelChange = (value: string) => {
    setFormData(prev => ({ ...prev, fitnessLevel: value }));
  };

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: {
        ...prev.symptoms,
        [symptom]: !prev.symptoms[symptom as keyof typeof prev.symptoms]
      }
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  
  const prevStep = () => setStep(prev => prev - 1);
  
  const handleComplete = () => {
    toast({
      title: "Profile Created Successfully",
      description: "Your personalized hormone optimization plan is ready!",
      duration: 5000,
    });
    
    // Navigate to dashboard after completion
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const stepLabels = ["Your Struggles", "Symptom Check", "Quick Assessment", "Hormone Profile", "Your Results"];
  const stepDescription = "Complete this short quiz to get your personalized hormone & fitness analysis";
  
  // Check if we have enough symptom data to show insights
  const hasSymptomData = Object.values(formData.symptoms).some(value => value);
  const symptomCount = Object.values(formData.symptoms).filter(v => v).length;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-0">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          {step < 5 ? "Get Your Free Hormone Analysis" : "Your Personalized Results"}
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {step < 5 
            ? "Let our AI create a personalized health plan based on your unique menopause journey" 
            : "Based on your inputs, we've created your personalized hormone-optimized plan"}
        </p>
      </div>

      <StepIndicator 
        currentStep={step} 
        totalSteps={5} 
        labels={stepLabels}
        description={stepDescription}
      />

      {step === 1 && (
        <AnimatedCard>
          <Card className="border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-rose-100/70 to-teal-100/70 pb-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <Flame className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl tracking-tight">What's Your Biggest Struggle?</CardTitle>
                  <CardDescription className="mt-1 text-base">
                    Let us know what challenges you're facing so we can help
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
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
                <Label htmlFor="email" className="text-sm font-medium">Your Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="Enter your email to receive your results" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-background/50"
                />
                <p className="text-xs text-muted-foreground mt-1">We'll send your free personalized hormone report to this address</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium">Your Age</Label>
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
              
              <div className="space-y-2">
                <Label htmlFor="menopauseStatus" className="text-sm font-medium">Where are you in your menopause journey?</Label>
                <Select 
                  value={formData.menopauseStatus} 
                  onValueChange={(value) => handleSelectChange('menopauseStatus', value)}
                >
                  <SelectTrigger id="menopauseStatus" className="bg-background/50">
                    <SelectValue placeholder="Select your status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pre">Pre-Menopausal</SelectItem>
                    <SelectItem value="Peri">Peri-Menopausal</SelectItem>
                    <SelectItem value="Post">Post-Menopausal</SelectItem>
                    <SelectItem value="Unsure">I'm not sure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex items-start space-x-3">
                  <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">Why this matters</h4>
                    <p className="text-sm text-muted-foreground">
                      85% of women experience hormonal imbalances during menopause. Understanding your stage helps our AI create a personalized plan for your specific needs.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-2 pb-6 px-6">
              <Button 
                onClick={nextStep} 
                className="px-5 gap-2"
                size="lg"
                disabled={!formData.name || !formData.email || !formData.age}
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
            <CardHeader className="bg-gradient-to-r from-rose-100/70 to-teal-100/70 pb-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl tracking-tight">Which Symptoms Affect You?</CardTitle>
                  <CardDescription className="mt-1 text-base">
                    Select all the symptoms you experience regularly
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="weightGain" 
                    checked={formData.symptoms.weightGain}
                    onCheckedChange={() => handleSymptomToggle('weightGain')}
                    className="mt-1"
                  />
                  <div className="grid gap-1.5">
                    <Label htmlFor="weightGain" className="text-sm font-medium">Weight Gain</Label>
                    <p className="text-xs text-muted-foreground">Especially around the abdomen</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="hotFlashes" 
                    checked={formData.symptoms.hotFlashes}
                    onCheckedChange={() => handleSymptomToggle('hotFlashes')}
                    className="mt-1"
                  />
                  <div className="grid gap-1.5">
                    <Label htmlFor="hotFlashes" className="text-sm font-medium">Hot Flashes</Label>
                    <p className="text-xs text-muted-foreground">Sudden feeling of warmth</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="fatigue"
                    checked={formData.symptoms.fatigue}
                    onCheckedChange={() => handleSymptomToggle('fatigue')}
                    className="mt-1"
                  />
                  <div className="grid gap-1.5">
                    <Label htmlFor="fatigue" className="text-sm font-medium">Fatigue</Label>
                    <p className="text-xs text-muted-foreground">Low energy levels throughout the day</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="sleepIssues"
                    checked={formData.symptoms.sleepIssues}
                    onCheckedChange={() => handleSymptomToggle('sleepIssues')}
                    className="mt-1"
                  />
                  <div className="grid gap-1.5">
                    <Label htmlFor="sleepIssues" className="text-sm font-medium">Sleep Issues</Label>
                    <p className="text-xs text-muted-foreground">Trouble falling or staying asleep</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="moodChanges"
                    checked={formData.symptoms.moodChanges}
                    onCheckedChange={() => handleSymptomToggle('moodChanges')}
                    className="mt-1"
                  />
                  <div className="grid gap-1.5">
                    <Label htmlFor="moodChanges" className="text-sm font-medium">Mood Changes</Label>
                    <p className="text-xs text-muted-foreground">Irritability, anxiety, or depression</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="brainFog"
                    checked={formData.symptoms.brainFog}
                    onCheckedChange={() => handleSymptomToggle('brainFog')}
                    className="mt-1"
                  />
                  <div className="grid gap-1.5">
                    <Label htmlFor="brainFog" className="text-sm font-medium">Brain Fog</Label>
                    <p className="text-xs text-muted-foreground">Difficulty concentrating or memory issues</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="jointPain"
                    checked={formData.symptoms.jointPain}
                    onCheckedChange={() => handleSymptomToggle('jointPain')}
                    className="mt-1"
                  />
                  <div className="grid gap-1.5">
                    <Label htmlFor="jointPain" className="text-sm font-medium">Joint Pain</Label>
                    <p className="text-xs text-muted-foreground">Aches and stiffness in joints</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 mt-6">
                <div className="flex items-start space-x-3">
                  <Sparkles className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">Did you know?</h4>
                    <p className="text-sm text-muted-foreground">
                      Your symptoms are key indicators of specific hormone imbalances. Our AI analyzes these patterns to create targeted solutions.
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
        </AnimatedCard>
      )}

      {step === 3 && (
        <AnimatedCard>
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
        </AnimatedCard>
      )}

      {step === 4 && (
        <AnimatedCard>
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
        </AnimatedCard>
      )}

      {step === 5 && (
        <AnimatedCard>
          <Card className="border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-rose-50 to-teal-50 pb-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary rounded-full shadow-sm">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl tracking-tight">Your AI-Generated Results</CardTitle>
                  <CardDescription className="mt-1 text-base">
                    Based on your responses, we've created your personalized plan
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="p-4 rounded-lg border bg-blue-50/30 mb-4">
                <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" /> AI Hormone Analysis
                </h3>
                
                {hasSymptomData ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Based on your {symptomCount} reported symptoms, our AI has identified potential hormonal imbalances:
                    </p>
                    
                    <div className="grid gap-3">
                      {formData.symptoms.hotFlashes || formData.symptoms.sleepIssues || formData.symptoms.moodChanges ? (
                        <InsightPanel
                          type="high"
                          title="Possible Estrogen Imbalance"
                          insights={[
                            "Your hot flashes, sleep issues, and mood changes suggest fluctuating estrogen levels",
                            "This can impact energy levels and recovery",
                            "Our plan addresses this with targeted exercise and nutrition"
                          ]}
                        />
                      ) : null}
                      
                      {formData.symptoms.weightGain || formData.symptoms.fatigue ? (
                        <InsightPanel
                          type="high"
                          title="Cortisol Management Needed"
                          insights={[
                            "Weight gain and fatigue can be linked to elevated cortisol levels",
                            "Stress hormones may be affecting your metabolism",
                            "Our plan includes stress reduction and metabolic support"
                          ]}
                        />
                      ) : null}
                      
                      {formData.symptoms.brainFog || formData.symptoms.jointPain ? (
                        <InsightPanel
                          type="high"
                          title="Inflammation Signals"
                          insights={[
                            "Brain fog and joint pain can indicate elevated inflammation",
                            "This can be triggered by hormone fluctuations",
                            "Anti-inflammatory strategies are included in your plan"
                          ]}
                        />
                      ) : null}
                    </div>
                    
                    <p className="text-xs text-muted-foreground italic mt-2">
                      Note: This is not a medical diagnosis. For a complete assessment, we recommend hormone testing.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    To receive a detailed hormone analysis, please go back and select the symptoms you experience.
                  </p>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-green-50/30">
                  <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" /> Your Fitness Plan Preview
                  </h3>
                  <ul className="space-y-2">
                    <li className="text-sm flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Hormone-optimized strength training</span>
                    </li>
                    <li className="text-sm flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Recovery-focused cardio sessions</span>
                    </li>
                    <li className="text-sm flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Stress-reducing mobility work</span>
                    </li>
                    <li className="text-sm flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Personalized progress tracking</span>
                    </li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-green-100">
                    <p className="text-xs text-muted-foreground">
                      Your full fitness plan adapts to your hormone fluctuations for optimal results.
                    </p>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border bg-rose-50/30">
                  <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-rose-600" /> Your Nutrition Plan Preview
                  </h3>
                  <ul className="space-y-2">
                    <li className="text-sm flex items-center gap-2">
                      <Check className="h-4 w-4 text-rose-600" />
                      <span>Hormone-balancing food suggestions</span>
                    </li>
                    <li className="text-sm flex items-center gap-2">
                      <Check className="h-4 w-4 text-rose-600" />
                      <span>Anti-inflammatory meal planning</span>
                    </li>
                    <li className="text-sm flex items-center gap-2">
                      <Check className="h-4 w-4 text-rose-600" />
                      <span>Metabolic support strategies</span>
                    </li>
                    <li className="text-sm flex items-center gap-2">
                      <Check className="h-4 w-4 text-rose-600" />
                      <span>Energy-optimizing supplement advice</span>
                    </li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-rose-100">
                    <p className="text-xs text-muted-foreground">
                      Your full nutrition plan is personalized to address your specific hormonal needs.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-5 rounded-lg border-2 border-primary bg-primary/5">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">Unlock Your Full Personalized Plan</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  You're not alone on this journey. Join thousands of women who have transformed their menopause experience with our AI-powered plans.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">Monthly</h4>
                        <p className="text-2xl font-bold">$19.99<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                      </div>
                      <div className="px-2 py-1 bg-primary/10 rounded text-xs font-medium text-primary">
                        POPULAR
                      </div>
                    </div>
                    <ul className="space-y-2 mb-3">
                      <li className="text-xs flex items-center gap-2">
                        <Check className="h-3 w-3 text-primary" />
                        <span>Full AI hormone optimization plan</span>
                      </li>
                      <li className="text-xs flex items-center gap-2">
                        <Check className="h-3 w-3 text-primary" />
                        <span>Weekly adjustments based on your data</span>
                      </li>
                      <li className="text-xs flex items-center gap-2">
                        <Check className="h-3 w-3 text-primary" />
                        <span>Personalized tracking dashboard</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-primary">Start 7-Day Free Trial</Button>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">Annual</h4>
                        <p className="text-2xl font-bold">$179.99<span className="text-sm font-normal text-muted-foreground">/year</span></p>
                      </div>
                      <div className="px-2 py-1 bg-green-100 rounded text-xs font-medium text-green-700">
                        SAVE 20%
                      </div>
                    </div>
                    <ul className="space-y-2 mb-3">
                      <li className="text-xs flex items-center gap-2">
                        <Check className="h-3 w-3 text-primary" />
                        <span>Everything in Monthly plan</span>
                      </li>
                      <li className="text-xs flex items-center gap-2">
                        <Check className="h-3 w-3 text-primary" />
                        <span>Free hormone testing kit</span>
                      </li>
                      <li className="text-xs flex items-center gap-2">
                        <Check className="h-3 w-3 text-primary" />
                        <span>Priority support and coaching</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-primary text-primary">Choose Annual Plan</Button>
                  </div>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  100% satisfaction guarantee • Cancel anytime • Secure payment
                </p>
              </div>
              
              <div className="text-center">
                <Button 
                  variant="link" 
                  onClick={handleComplete}
                  className="text-muted-foreground"
                >
                  Skip for now and explore the dashboard
                </Button>
              </div>
              
            </CardContent>
          </Card>
        </AnimatedCard>
      )}
    </div>
  );
};

export default ProfileSetup;
