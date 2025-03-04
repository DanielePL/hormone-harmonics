
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedCard from '@/components/ui/AnimatedCard';
import WorkoutPlanCard from '../WorkoutPlanCard';
import WeeklyPlanCard from '../WeeklyPlanCard';
import { UserProfile } from '@/utils/types';
import { FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface WorkoutPlanSectionProps {
  userProfile?: UserProfile;
}

const WorkoutPlanSection = ({ userProfile }: WorkoutPlanSectionProps) => {
  const navigate = useNavigate();

  const navigateToProfileSetup = () => {
    navigate('/profile-setup');
  };

  const needsHormoneData = !userProfile?.lastPeriodDate || (!userProfile?.hasMenstrualCycle && userProfile?.menopauseStatus === 'Pre');

  return (
    <AnimatedCard>
      <GlassCard>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Your AI-Powered Workout Plan</h3>
          <p className="text-sm text-muted-foreground">
            Personalized based on your hormone levels, recovery status, and goals
          </p>
        </div>
        
        {needsHormoneData ? (
          <div className="bg-primary/5 p-4 rounded-lg mb-4">
            <div className="flex items-start gap-3">
              <FileUp className="text-primary mt-0.5" size={20} />
              <div>
                <h4 className="font-medium mb-1">Complete Your Hormone Profile</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  To provide the most accurate workout recommendations, we need additional information about your hormonal health.
                </p>
                <Button onClick={navigateToProfileSetup} size="sm">
                  Complete Profile
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <WorkoutPlanCard userProfile={userProfile} />
            <WeeklyPlanCard userProfile={userProfile} />
          </div>
        )}
      </GlassCard>
    </AnimatedCard>
  );
};

export default WorkoutPlanSection;
