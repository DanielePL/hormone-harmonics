
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Exercise } from '@/utils/types';
import AnimatedCard from '@/components/ui/AnimatedCard';
import ExerciseForm from './ExerciseForm';

const LogWorkoutForm = () => {
  const [exercises, setExercises] = React.useState<Exercise[]>([{ 
    name: '', 
    sets: [{ weight: undefined, reps: undefined, rpe: undefined }] 
  }]);
  
  return (
    <AnimatedCard>
      <Card>
        <CardHeader>
          <CardTitle>Log Workout Session</CardTitle>
          <CardDescription>Record your training details for optimal progress tracking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workout-date">Date</Label>
                <Input id="workout-date" type="date" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="workout-type">Workout Type</Label>
                <Select>
                  <SelectTrigger id="workout-type">
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strength">Strength Training</SelectItem>
                    <SelectItem value="hiit">HIIT</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="mobility">Mobility</SelectItem>
                    <SelectItem value="recovery">Recovery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input id="duration" type="number" placeholder="e.g., 60" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="energy-level">Energy Level (1-10)</Label>
                <Input id="energy-level" type="number" min="1" max="10" placeholder="Rate from 1-10" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rpe">Overall RPE (1-10)</Label>
                <Input id="rpe" type="number" min="1" max="10" placeholder="Rate of Perceived Exertion" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Add details about your workout" />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <ExerciseForm exercises={exercises} setExercises={setExercises} />
          
          <div className="flex justify-end">
            <Button>Save Workout</Button>
          </div>
        </CardContent>
      </Card>
    </AnimatedCard>
  );
};

export default LogWorkoutForm;
