
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Flame, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface BasicInfoStepProps {
  formData: {
    name: string;
    email: string;
    age: string;
    menopauseStatus: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  nextStep: () => void;
  ageRecommendation?: string | null;
}

const BasicInfoStep = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange, 
  nextStep,
  ageRecommendation
}: BasicInfoStepProps) => {
  const [focused, setFocused] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({
    name: false,
    email: false,
    age: false
  });

  // Form validation
  const isEmailValid = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const getValidationStatus = (field: string) => {
    if (!touched[field]) return null;
    
    switch (field) {
      case 'name':
        return formData.name.length >= 2;
      case 'email':
        return isEmailValid(formData.email);
      case 'age':
        const age = parseInt(formData.age);
        return !isNaN(age) && age > 0 && age < 120;
      default:
        return true;
    }
  };

  const handleBlur = (field: string) => {
    setFocused(null);
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleFocus = (field: string) => {
    setFocused(field);
  };

  // Auto-suggest for age based on menopause status
  const suggestAge = () => {
    if (!formData.age && formData.menopauseStatus) {
      let suggestedAge = '';
      
      switch (formData.menopauseStatus) {
        case 'Pre':
          suggestedAge = '40';
          break;
        case 'Peri':
          suggestedAge = '47';
          break;
        case 'Post':
          suggestedAge = '55';
          break;
        default:
          suggestedAge = '';
      }
      
      const event = {
        target: {
          name: 'age',
          value: suggestedAge
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleInputChange(event);
    }
  };

  return (
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
          <div className="relative">
            <Input 
              id="name" 
              name="name" 
              placeholder="Enter your name" 
              value={formData.name}
              onChange={handleInputChange}
              onFocus={() => handleFocus('name')}
              onBlur={() => handleBlur('name')}
              className={`bg-background/50 pr-10 ${
                getValidationStatus('name') === false ? 'border-red-300 focus:ring-red-500' : 
                getValidationStatus('name') === true ? 'border-green-300 focus:ring-green-500' : ''
              }`}
            />
            {touched['name'] && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {getValidationStatus('name') ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          {touched['name'] && !getValidationStatus('name') && (
            <p className="text-xs text-red-500 mt-1">Please enter your name (at least 2 characters)</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Your Email</Label>
          <div className="relative">
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="Enter your email to receive your results" 
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              className={`bg-background/50 pr-10 ${
                getValidationStatus('email') === false ? 'border-red-300 focus:ring-red-500' : 
                getValidationStatus('email') === true ? 'border-green-300 focus:ring-green-500' : ''
              }`}
              autoComplete="email"
            />
            {touched['email'] && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {getValidationStatus('email') ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          {touched['email'] && !getValidationStatus('email') && (
            <p className="text-xs text-red-500 mt-1">Please enter a valid email address</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">We'll send your free personalized hormone report to this address</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="menopauseStatus" className="text-sm font-medium">Where are you in your menopause journey?</Label>
          <Select 
            value={formData.menopauseStatus} 
            onValueChange={(value) => {
              handleSelectChange('menopauseStatus', value);
              // Suggest age after menopause status selection
              setTimeout(suggestAge, 100);
            }}
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
        
        <div className="space-y-2">
          <Label htmlFor="age" className="text-sm font-medium">Your Age</Label>
          <div className="relative">
            <Input 
              id="age" 
              name="age" 
              type="number" 
              placeholder="Enter your age" 
              value={formData.age}
              onChange={handleInputChange}
              onFocus={() => handleFocus('age')}
              onBlur={() => handleBlur('age')}
              className={`bg-background/50 pr-10 ${
                getValidationStatus('age') === false ? 'border-red-300 focus:ring-red-500' : 
                getValidationStatus('age') === true ? 'border-green-300 focus:ring-green-500' : ''
              }`}
            />
            {touched['age'] && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {getValidationStatus('age') ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          {touched['age'] && !getValidationStatus('age') && (
            <p className="text-xs text-red-500 mt-1">Please enter a valid age</p>
          )}
          {ageRecommendation && !focused && (
            <p className="text-xs text-primary mt-1">{ageRecommendation}</p>
          )}
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
          disabled={!formData.name || !formData.email || !formData.age || !isEmailValid(formData.email)}
        >
          Continue <ArrowRight size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BasicInfoStep;
