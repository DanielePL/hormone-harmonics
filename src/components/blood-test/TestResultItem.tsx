
import React from 'react';
import { Check, ArrowUp, ArrowDown, Minus, Info } from 'lucide-react';

interface TestResultItemProps {
  name: string;
  value: number;
  unit: string;
  range: string;
  status: 'optimal' | 'normal' | 'borderline' | 'high' | 'low';
  info?: string;
}

const TestResultItem = ({ name, value, unit, range, status, info }: TestResultItemProps) => {
  const getStatusColors = () => {
    switch (status) {
      case 'optimal':
        return {
          bg: 'bg-insight-optimal',
          text: 'text-green-700',
          icon: <Check size={16} />
        };
      case 'normal':
        return {
          bg: 'bg-insight-optimal',
          text: 'text-green-700',
          icon: <Check size={16} />
        };
      case 'borderline':
        return {
          bg: 'bg-insight-high',
          text: 'text-yellow-700',
          icon: <Minus size={16} />
        };
      case 'high':
        return {
          bg: 'bg-insight-low',
          text: 'text-red-700',
          icon: <ArrowUp size={16} />
        };
      case 'low':
        return {
          bg: 'bg-insight-low',
          text: 'text-red-700',
          icon: <ArrowDown size={16} />
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          icon: <Info size={16} />
        };
    }
  };

  const { bg, text, icon } = getStatusColors();

  return (
    <div className="p-4 border border-border rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div>
          <h4 className="font-medium">{name}</h4>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-2xl font-bold">{value}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Range: {range}</span>
          <div className={`px-2 py-1 rounded-full ${bg} ${text} flex items-center gap-1 text-xs font-medium`}>
            {icon}
            <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
          </div>
        </div>
      </div>
      {info && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-sm text-muted-foreground">{info}</p>
        </div>
      )}
    </div>
  );
};

export default TestResultItem;
