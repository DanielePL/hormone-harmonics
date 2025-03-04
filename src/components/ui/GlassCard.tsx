
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
