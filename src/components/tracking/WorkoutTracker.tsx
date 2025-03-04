
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LogWorkoutForm from './workout/LogWorkoutForm';
import ProgressTracker from './workout/ProgressTracker';
import WorkoutPlanSection from './workout/WorkoutPlanSection';
import { UserProfile } from '@/utils/types';

const WorkoutTracker = () => {
  // Mock user profile for development purposes
  const [userProfile] = React.useState<UserProfile | undefined>({
    id: '1',
    name: 'Jane Doe',
    age: 42,
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Workout Tracker</h1>
        <p className="text-muted-foreground">Log your workouts and track your strength progress</p>
      </div>

      <Tabs defaultValue="log" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="log">Log Workout</TabsTrigger>
          <TabsTrigger value="plan">Workout Plan</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="log" className="mt-4 space-y-4">
          <LogWorkoutForm />
        </TabsContent>
        
        <TabsContent value="plan" className="mt-4">
          <WorkoutPlanSection userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="progress" className="mt-4">
          <ProgressTracker />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkoutTracker;
