
import React from 'react';
import { AlertCircle, Info, Check } from 'lucide-react';

interface RecommendationCardProps {
  title: string;
  description: string;
  items: string[];
  priority: 'high' | 'medium' | 'low';
}

const RecommendationCard = ({ title, description, items, priority }: RecommendationCardProps) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className={`p-4 border rounded-lg ${getPriorityColor()}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            {priority === 'high' ? (
              <AlertCircle size={16} className="text-red-500" />
            ) : priority === 'medium' ? (
              <Info size={16} className="text-yellow-500" />
            ) : (
              <Check size={16} className="text-green-500" />
            )}
          </div>
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          
          <ul className="mt-3 space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="rounded-full w-4 h-4 bg-white flex items-center justify-center mt-0.5">
                  <Check size={10} className="text-primary" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
