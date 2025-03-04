
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedCard from '@/components/ui/AnimatedCard';
import WorkoutPlanCard from '../WorkoutPlanCard';
import WeeklyPlanCard from '../WeeklyPlanCard';
import { UserProfile } from '@/utils/types';

interface WorkoutPlanSectionProps {
  userProfile?: UserProfile;
}

const WorkoutPlanSection = ({ userProfile }: WorkoutPlanSectionProps) => {
  return (
    <AnimatedCard>
      <GlassCard>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Your AI-Powered Workout Plan</h3>
          <p className="text-sm text-muted-foreground">
            Personalized based on your hormone levels, recovery status, and goals
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <WorkoutPlanCard userProfile={userProfile} />
          <WeeklyPlanCard userProfile={userProfile} />
        </div>
      </GlassCard>
    </AnimatedCard>
  );
};

export default WorkoutPlanSection;
