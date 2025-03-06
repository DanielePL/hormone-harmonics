
import React from 'react';
import { Sparkles } from 'lucide-react';

const FactPanel = () => {
  return (
    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 mt-6">
      <div className="flex items-start space-x-3">
        <Sparkles className="h-5 w-5 text-amber-600 mt-0.5" />
        <div>
          <h4 className="font-medium text-sm mb-1">Did you know?</h4>
          <p className="text-sm text-muted-foreground">
            Your symptoms are key indicators of specific hormone imbalances. Our AI analyzes these patterns to create targeted solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FactPanel;
