
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Check, Info, AlertCircle } from 'lucide-react';

const NextStepsCard = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Next Steps</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <Check size={14} className="text-green-600" />
            </div>
            <span>Review your personalized health plan</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <Info size={14} className="text-blue-600" />
            </div>
            <span>Schedule follow-up tests in 3 months</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="shrink-0 w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
              <AlertCircle size={14} className="text-yellow-600" />
            </div>
            <span>Consult with healthcare provider about thyroid function</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default NextStepsCard;
