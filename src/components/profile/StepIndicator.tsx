
import React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

const StepIndicator = ({ currentStep, totalSteps, labels }: StepIndicatorProps) => {
  return (
    <div className="w-full max-w-xl mx-auto mt-8 mb-4">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <React.Fragment key={stepNumber}>
              {/* Step Circle */}
              <div className="relative flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                    isActive ? "border-primary bg-primary/10 text-primary" : 
                    isCompleted ? "border-primary bg-primary text-primary-foreground" : 
                    "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{stepNumber}</span>
                  )}
                </div>
                {labels && (
                  <span 
                    className={cn(
                      "absolute -bottom-6 text-xs whitespace-nowrap", 
                      isActive || isCompleted ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {labels[index]}
                  </span>
                )}
              </div>
              
              {/* Connector Line (except after last step) */}
              {stepNumber !== totalSteps && (
                <div 
                  className={cn(
                    "flex-1 h-0.5 mx-2",
                    stepNumber < currentStep ? "bg-primary" : "bg-muted-foreground/30"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
