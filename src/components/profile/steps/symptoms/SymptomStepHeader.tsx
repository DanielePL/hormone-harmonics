
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ClipboardCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const SymptomStepHeader = () => {
  return (
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
  );
};

export default SymptomStepHeader;
