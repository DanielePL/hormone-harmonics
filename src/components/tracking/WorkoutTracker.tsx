
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMediaQuery } from '@/hooks/use-media-query';
import LogWorkoutForm from './workout/LogWorkoutForm';
import ProgressTracker from './workout/ProgressTracker';
import WorkoutPlanSection from './workout/WorkoutPlanSection';
import AIWorkoutAssistant from './workout/AIWorkoutAssistant';
import { UserProfile } from '@/utils/types';

const WorkoutTracker = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  // Mock user profile for development purposes
  const [userProfile] = React.useState<UserProfile | undefined>({
    id: '1',
    name: 'Jane Doe',
    age: 52,
    weight: 65,
    height: 168,
    activityLevel: 'Active',
    menopauseStatus: 'Peri',
    hasMenstrualCycle: true,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  return (
    <div className="space-y-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Your Fitness Journey</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Track your progress and maintain strength with workouts tailored to your body's needs
        </p>
      </div>

      <Tabs defaultValue="log" className="w-full">
        <div className={`${isMobile ? "mb-16" : "mb-6"}`}>
          <TabsList className={`${isMobile ? "flex flex-wrap gap-2" : "grid grid-cols-4"} w-full`}>
            <TabsTrigger 
              value="log" 
              className="text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium py-3"
            >
              Log Workout
            </TabsTrigger>
            <TabsTrigger 
              value="plan" 
              className="text-base data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary-foreground font-medium py-3"
            >
              My Plan
            </TabsTrigger>
            <TabsTrigger 
              value="progress" 
              className="text-base data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary-foreground font-medium py-3"
            >
              Progress
            </TabsTrigger>
            <TabsTrigger 
              value="ai" 
              className="text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium py-3"
            >
              AI Coach
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="log" className={`${isMobile ? "mt-6" : "mt-8"} space-y-6`}>
          <LogWorkoutForm />
        </TabsContent>
        
        <TabsContent value="plan" className={`${isMobile ? "mt-6" : "mt-8"}`}>
          <WorkoutPlanSection userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="progress" className={`${isMobile ? "mt-6" : "mt-8"}`}>
          <ProgressTracker />
        </TabsContent>
        
        <TabsContent value="ai" className={`${isMobile ? "mt-6" : "mt-8"}`}>
          <AIWorkoutAssistant userProfile={userProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkoutTracker;
