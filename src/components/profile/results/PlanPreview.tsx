
import React from 'react';
import { Check, Activity, Utensils } from 'lucide-react';

const PlanPreview = () => {
  return (
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
  );
};

export default PlanPreview;
