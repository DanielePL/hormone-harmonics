
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Flame, ArrowRight, Sparkles } from 'lucide-react';

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
}

const BasicInfoStep = ({ formData, handleInputChange, handleSelectChange, nextStep }: BasicInfoStepProps) => {
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
  );
};

export default BasicInfoStep;
