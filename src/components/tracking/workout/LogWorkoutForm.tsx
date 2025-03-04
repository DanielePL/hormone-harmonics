
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
import { Calendar, Sparkles, Clock, Battery, Gauge, StickyNote } from 'lucide-react';

const LogWorkoutForm = () => {
  const [exercises, setExercises] = React.useState<Exercise[]>([{ 
    name: '', 
    sets: [{ weight: undefined, reps: undefined, rpe: undefined }] 
  }]);
  
  return (
    <AnimatedCard>
      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-rose-50 to-purple-50 dark:from-rose-950/20 dark:to-purple-950/20 pb-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-full shadow-sm">
              <Sparkles className="w-5 h-5 text-primary" />
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
                  <Input 
                    id="workout-date" 
                    type="date" 
                    className="pl-10 form-field-validated border-0 shadow-sm focus:shadow-md" 
                  />
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="workout-type" className="text-sm font-medium">Workout Type</Label>
                <Select>
                  <SelectTrigger id="workout-type" className="form-field-validated border-0 shadow-sm focus:shadow-md">
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                  <SelectContent className="premium-shadow">
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
                <div className="relative">
                  <Input 
                    id="duration" 
                    type="number" 
                    placeholder="e.g., 45" 
                    className="pl-10 form-field-validated border-0 shadow-sm focus:shadow-md" 
                  />
                  <Clock className="absolute left-3 top-2.5 h-5 w-5 text-primary/70" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="energy-level" className="text-sm font-medium">Energy Level (1-10)</Label>
                <div className="relative">
                  <Input 
                    id="energy-level" 
                    type="number" 
                    min="1" 
                    max="10" 
                    placeholder="How energetic did you feel?" 
                    className="pl-10 form-field-validated border-0 shadow-sm focus:shadow-md"
                  />
                  <Battery className="absolute left-3 top-2.5 h-5 w-5 text-primary/70" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rpe" className="text-sm font-medium">Overall Effort (1-10)</Label>
                <div className="relative">
                  <Input 
                    id="rpe" 
                    type="number" 
                    min="1" 
                    max="10" 
                    placeholder="Rate your perceived exertion" 
                    className="pl-10 form-field-validated border-0 shadow-sm focus:shadow-md"
                  />
                  <Gauge className="absolute left-3 top-2.5 h-5 w-5 text-primary/70" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">Notes</Label>
                <div className="relative">
                  <Textarea 
                    id="notes" 
                    placeholder="How did you feel? Any observations to record?" 
                    className="resize-none form-field-validated border-0 shadow-sm focus:shadow-md min-h-[100px] pl-10 pt-8"
                  />
                  <StickyNote className="absolute left-3 top-2.5 h-5 w-5 text-primary/70" />
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-6 bg-gradient-to-r from-transparent via-primary/20 to-transparent h-px" />
          
          <ExerciseForm exercises={exercises} setExercises={setExercises} />
          
          <div className="flex justify-end mt-6">
            <Button size="lg" className="modern-button px-8 hover:scale-[1.02] transition-all">
              Save Workout
            </Button>
          </div>
        </CardContent>
      </Card>
    </AnimatedCard>
  );
};

export default LogWorkoutForm;
