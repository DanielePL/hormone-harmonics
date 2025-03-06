
import React from 'react';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SymptomStepFooterProps {
  prevStep: () => void;
  nextStep: () => void;
  selectedCount: number;
}

const SymptomStepFooter = ({ prevStep, nextStep, selectedCount }: SymptomStepFooterProps) => {
  return (
    <CardFooter className="flex justify-between pt-2 pb-6 px-6">
      <Button 
        variant="outline" 
        onClick={prevStep}
        className="gap-2"
      >
        <ArrowLeft size={16} /> Back
      </Button>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {selectedCount} symptoms selected
        </span>
        <Button 
          onClick={nextStep}
          className="px-5 gap-2"
          size="lg"
        >
          Continue <ArrowRight size={16} />
        </Button>
      </div>
    </CardFooter>
  );
};

export default SymptomStepFooter;
