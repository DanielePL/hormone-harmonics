
import React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
  description?: string;
}

const StepIndicator = ({ currentStep, totalSteps, labels, description }: StepIndicatorProps) => {
  return (
    <div className="w-full max-w-xl mx-auto mt-8 mb-8">
      {description && (
        <p className="text-center text-muted-foreground mb-4 px-4 text-sm">
          {description}
        </p>
      )}
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
                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all shadow-sm",
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
                      "absolute -bottom-7 text-xs text-center whitespace-nowrap max-w-28", 
                      isActive || isCompleted ? "text-primary font-medium" : "text-muted-foreground"
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
