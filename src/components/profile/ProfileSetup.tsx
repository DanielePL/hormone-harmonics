
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { MenopauseStatus, ActivityLevel } from '@/utils/types';
import { FileUp, ClipboardCheck } from 'lucide-react';

const ProfileSetup = () => {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
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

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6 text-center">Create Your Profile</h1>
      <p className="text-muted-foreground text-center mb-8">
        Let's personalize your experience to provide the most accurate hormone and fitness insights
      </p>

      {step === 1 && (
        <AnimatedCard>
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Tell us about yourself so we can personalize your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Enter your name" 
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  name="age" 
                  type="number" 
                  placeholder="Enter your age" 
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight" 
                    name="weight" 
                    type="number" 
                    placeholder="Weight in kg" 
                    value={formData.weight}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height" 
                    name="height" 
                    type="number" 
                    placeholder="Height in cm" 
                    value={formData.height}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="activityLevel">Activity Level</Label>
                <Select 
                  value={formData.activityLevel} 
                  onValueChange={(value) => handleSelectChange('activityLevel', value)}
                >
                  <SelectTrigger id="activityLevel">
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
            <CardFooter className="flex justify-end">
              <Button onClick={nextStep}>Continue</Button>
            </CardFooter>
          </Card>
        </AnimatedCard>
      )}

      {step === 2 && (
        <AnimatedCard>
          <Card>
            <CardHeader>
              <CardTitle>Hormonal Health Information</CardTitle>
              <CardDescription>This helps us provide personalized insights for your hormonal health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Menopause Status</Label>
                <Select 
                  value={formData.menopauseStatus} 
                  onValueChange={(value) => handleSelectChange('menopauseStatus', value)}
                >
                  <SelectTrigger>
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
                <Label>Do you still have a menstrual cycle?</Label>
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
                  <Label htmlFor="lastPeriodDate">Date of Last Period</Label>
                  <Input 
                    id="lastPeriodDate" 
                    name="lastPeriodDate" 
                    type="date" 
                    value={formData.lastPeriodDate}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div className="space-y-2 mt-6">
                <Label>Do you know your hormone profile?</Label>
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
                  <Label>Do you have a lab report of your hormone profile?</Label>
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
                <div className="mt-4 p-4 border rounded-lg bg-primary/5">
                  <div className="flex items-center gap-2 mb-2">
                    <FileUp size={20} className="text-primary" />
                    <h4 className="font-medium">Upload Lab Results</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Upload your hormone lab results to receive personalized workout and nutrition recommendations
                  </p>
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <FileUp size={16} />
                    Upload Lab Report
                  </Button>
                </div>
              )}

              {!formData.hasHormoneProfile && (
                <div className="space-y-2">
                  <Label>Would you be interested in hormone testing?</Label>
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
                <div className="mt-2 p-4 border rounded-lg bg-primary/5">
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
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>Back</Button>
              <Button onClick={nextStep}>Continue</Button>
            </CardFooter>
          </Card>
        </AnimatedCard>
      )}

      {step === 3 && (
        <AnimatedCard>
          <Card>
            <CardHeader>
              <CardTitle>Strength Levels</CardTitle>
              <CardDescription>Share your current strength levels to help us personalize your workout recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="squat">Squat (kg)</Label>
                  <Input 
                    id="squat" 
                    name="squat" 
                    type="number" 
                    placeholder="Optional" 
                    value={formData.squat}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadlift">Deadlift (kg)</Label>
                  <Input 
                    id="deadlift" 
                    name="deadlift" 
                    type="number" 
                    placeholder="Optional" 
                    value={formData.deadlift}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="benchPress">Bench Press (kg)</Label>
                  <Input 
                    id="benchPress" 
                    name="benchPress" 
                    type="number" 
                    placeholder="Optional" 
                    value={formData.benchPress}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overhead">Overhead Press (kg)</Label>
                  <Input 
                    id="overhead" 
                    name="overhead" 
                    type="number" 
                    placeholder="Optional" 
                    value={formData.overhead}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rowWeight">Row (kg)</Label>
                <Input 
                  id="rowWeight" 
                  name="rowWeight" 
                  type="number" 
                  placeholder="Optional" 
                  value={formData.rowWeight}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>Back</Button>
              <Button>Complete Profile</Button>
            </CardFooter>
          </Card>
        </AnimatedCard>
      )}
      
      <div className="flex justify-center mt-6">
        <div className="flex gap-2">
          <div className={`w-3 h-3 rounded-full ${step === 1 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`w-3 h-3 rounded-full ${step === 2 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`w-3 h-3 rounded-full ${step === 3 ? 'bg-primary' : 'bg-muted'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
