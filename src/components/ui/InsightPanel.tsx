
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, InfoIcon } from 'lucide-react';

type InsightType = 'low' | 'optimal' | 'high' | 'info';

interface InsightPanelProps {
  type?: InsightType;
  title: string;
  description?: string;
  insights?: string[];
  className?: string;
}

const InsightPanel = ({ type = 'info', title, description, insights, className }: InsightPanelProps) => {
  const getIcon = () => {
    switch (type) {
      case 'low':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'optimal':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'high':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      case 'info':
      default:
        return <InfoIcon className="w-5 h-5 text-primary" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'low':
        return 'bg-amber-50 border-amber-200';
      case 'optimal':
        return 'bg-green-50 border-green-200';
      case 'high':
        return 'bg-blue-50 border-blue-200';
      case 'info':
      default:
        return 'bg-primary/5 border-primary/20';
    }
  };

  return (
    <div className={cn(
      "rounded-lg p-4 border animate-fade-in", 
      getBgColor(),
      className
    )}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {getIcon()}
        </div>
        <div>
          {description ? (
            <>
              <h4 className="font-medium text-sm">{title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            </>
          ) : insights ? (
            <>
              <h4 className="font-medium text-sm">{title}</h4>
              <ul className="mt-2 space-y-2">
                {insights.map((insight, index) => (
                  <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary mt-1.5"></div>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <h4 className="font-medium text-sm">{title}</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightPanel;
