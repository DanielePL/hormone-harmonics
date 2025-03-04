
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
import { Calendar, FileSparkles } from 'lucide-react';

const LogWorkoutForm = () => {
  const [exercises, setExercises] = React.useState<Exercise[]>([{ 
    name: '', 
    sets: [{ weight: undefined, reps: undefined, rpe: undefined }] 
  }]);
  
  return (
    <AnimatedCard>
      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-rose-50 to-purple-50 pb-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <FileSparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl tracking-tight">Log Your Workout</CardTitle>
              <CardDescription className="mt-1 text-base">
                Keep track of your strength and build consistency
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workout-date" className="text-sm font-medium">Date</Label>
                <div className="relative">
                  <Input id="workout-date" type="date" className="pl-10" />
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="workout-type" className="text-sm font-medium">Workout Type</Label>
                <Select>
                  <SelectTrigger id="workout-type" className="w-full">
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strength">Strength Training</SelectItem>
                    <SelectItem value="hiit">HIIT</SelectItem>
                    <SelectItem value="cardio">Cardiovascular</SelectItem>
                    <SelectItem value="mobility">Mobility & Flexibility</SelectItem>
                    <SelectItem value="recovery">Active Recovery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-sm font-medium">Duration (minutes)</Label>
                <Input id="duration" type="number" placeholder="e.g., 45" className="w-full" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="energy-level" className="text-sm font-medium">Energy Level (1-10)</Label>
                <Input id="energy-level" type="number" min="1" max="10" placeholder="How energetic did you feel?" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rpe" className="text-sm font-medium">Overall Effort (1-10)</Label>
                <Input id="rpe" type="number" min="1" max="10" placeholder="Rate your perceived exertion" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">Notes</Label>
                <Textarea id="notes" placeholder="How did you feel? Any observations to record?" className="resize-none" />
              </div>
            </div>
          </div>
          
          <Separator className="my-6 bg-gradient-to-r from-transparent via-primary/20 to-transparent h-px" />
          
          <ExerciseForm exercises={exercises} setExercises={setExercises} />
          
          <div className="flex justify-end mt-6">
            <Button size="lg" className="px-6">
              Save Workout
            </Button>
          </div>
        </CardContent>
      </Card>
    </AnimatedCard>
  );
};

export default LogWorkoutForm;
