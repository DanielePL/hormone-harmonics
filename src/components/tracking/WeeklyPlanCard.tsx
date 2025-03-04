
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import InsightPanel from '@/components/ui/InsightPanel';
import { UserProfile } from '@/utils/types';

interface WeeklyPlanCardProps {
  userProfile?: UserProfile;
}

const WeeklyPlanCard = ({ userProfile }: WeeklyPlanCardProps) => {
  const currentDay = new Date().getDay();
  const weeklyPlan = getWeeklyPlan(userProfile?.activityLevel || 'Moderate');

  return (
    <div className="space-y-4">
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Weekly Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-7 gap-1">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div 
                  key={i} 
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    i === currentDay - 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              {weeklyPlan.map((plan, index) => (
                <div key={index} className={`flex justify-between text-sm ${index === currentDay - 1 ? 'font-medium' : ''}`}>
                  <span>{getDayName(index)}</span>
                  <span className={index === currentDay - 1 ? 'text-primary' : 'text-muted-foreground'}>
                    {plan}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <InsightPanel
        type="optimal"
        title="Cortisol Management"
        description="Your current workout plan balances intensity with recovery to optimize cortisol levels and support hormone production."
      />
    </div>
  );
};

const getDayName = (index: number): string => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days[index];
};

const getWeeklyPlan = (activityLevel: string): string[] => {
  switch (activityLevel) {
    case 'Very Active':
      return [
        'Heavy Lower Body',
        'Upper Body Strength',
        'HIIT & Core',
        'Heavy Upper Body',
        'Lower Body Power',
        'Full Body Strength',
        'Active Recovery'
      ];
    case 'Active':
      return [
        'Heavy Squat + Power',
        'Upper Body Strength',
        'Recovery & Zone 2',
        'Heavy Deadlifts',
        'HIIT & Power',
        'Full Body Strength',
        'Recovery & Mobility'
      ];
    default:
      return [
        'Full Body Strength',
        'Light Cardio',
        'Rest',
        'Upper Body Focus',
        'Lower Body Focus',
        'Light Activity',
        'Rest'
      ];
  }
};

export default WeeklyPlanCard;
