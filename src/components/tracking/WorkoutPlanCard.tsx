
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Dumbbell, Activity } from 'lucide-react';
import InsightPanel from '@/components/ui/InsightPanel';
import { UserProfile } from '@/utils/types';

interface WorkoutPlanCardProps {
  userProfile?: UserProfile;
}

const WorkoutPlanCard = ({ userProfile }: WorkoutPlanCardProps) => {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Today's Recommended Workout</CardTitle>
          <Calendar className="w-4 h-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-primary" />
            <h4 className="font-medium">
              {userProfile?.menopauseStatus === 'Peri' ? 'Moderate Intensity Training' : 'Upper Body Strength'}
            </h4>
          </div>
          
          <InsightPanel
            type="info"
            title="Hormone-Optimized Training"
            description="Today's workout is tailored for your current hormone levels. Focus on controlled tempo and moderate volume."
          />
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Bench Press</span>
              <span>3 sets x 8 reps</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">Dumbbell Row</span>
              <span>3 sets x 12 reps</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">Overhead Press</span>
              <span>3 sets x 10 reps</span>
            </div>
          </div>
          
          <Button className="w-full">
            <Activity className="w-4 h-4 mr-2" />
            Start Workout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutPlanCard;
