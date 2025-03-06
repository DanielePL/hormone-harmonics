
import React from 'react';
import { Button } from '@/components/ui/button';
import { BadgeCheck } from 'lucide-react';

interface RecommendationPanelProps {
  recommendedSymptoms: string[];
  getSymptomLabel: (key: string) => string;
  onApply: () => void;
}

const RecommendationPanel = ({ 
  recommendedSymptoms, 
  getSymptomLabel, 
  onApply 
}: RecommendationPanelProps) => {
  if (recommendedSymptoms.length === 0) return null;
  
  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mb-4">
      <div className="flex items-start space-x-3">
        <BadgeCheck className="h-5 w-5 text-blue-600 mt-0.5" />
        <div>
          <h4 className="font-medium text-sm mb-1">AI Recommendation</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Based on your menopause status, many women like you commonly experience:
            {recommendedSymptoms.map(s => ` ${getSymptomLabel(s)},`).join('').slice(0, -1)}
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
            onClick={onApply}
          >
            Apply Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPanel;
