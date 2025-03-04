
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

const GlassCard = ({ children, className, interactive = false }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card",
        interactive && "hover:-translate-y-1 transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
