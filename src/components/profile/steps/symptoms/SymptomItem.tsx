
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface SymptomItemProps {
  id: string;
  label: string;
  description: string;
  isChecked: boolean;
  isRecommended?: boolean;
  onToggle: () => void;
}

const SymptomItem = ({ 
  id, 
  label, 
  description, 
  isChecked, 
  isRecommended = false,
  onToggle 
}: SymptomItemProps) => {
  return (
    <div 
      className={cn(
        "flex items-start space-x-3 p-3 rounded-lg transition-all duration-200",
        isChecked ? "bg-primary/5 border border-primary/20" : "hover:bg-slate-50"
      )}
    >
      <Checkbox 
        id={id} 
        checked={isChecked}
        onCheckedChange={onToggle}
        className={cn(
          "mt-1",
          isRecommended ? "border-primary" : "",
          isChecked ? "border-primary" : ""
        )}
      />
      <div className="grid gap-1">
        <Label 
          htmlFor={id} 
          className={cn(
            "text-sm font-medium cursor-pointer",
            isChecked ? "text-primary" : ""
          )}
        >
          {label}
        </Label>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SymptomItem;
