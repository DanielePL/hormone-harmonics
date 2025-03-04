import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Dumbbell, Activity, Calendar } from 'lucide-react';
import InsightPanel from '@/components/ui/InsightPanel';
import WorkoutPlanCard from './WorkoutPlanCard';
import WeeklyPlanCard from './WeeklyPlanCard';

const WorkoutTracker = () => {
  const [exercises, setExercises] = React.useState([{ name: '', sets: [{ weight: '', reps: '', rpe: '' }] }]);

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: [{ weight: '', reps: '', rpe: '' }] }]);
  };

  const removeExercise = (index: number) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  const addSet = (exerciseIndex: number) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].sets.push({ weight: '', reps: '', rpe: '' });
    setExercises(newExercises);
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].sets.splice(setIndex, 1);
    setExercises(newExercises);
  };

  const handleExerciseNameChange = (index: number, value: string) => {
    const newExercises = [...exercises];
    newExercises[index].name = value;
    setExercises(newExercises);
  };

  const handleSetChange = (exerciseIndex: number, setIndex: number, field: string, value: string) => {
    const newExercises = [...exercises];
    (newExercises[exerciseIndex].sets[setIndex] as any)[field] = value;
    setExercises(newExercises);
  };

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
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Exercises</h3>
                    <Button variant="outline" size="sm" onClick={addExercise}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Exercise
                    </Button>
                  </div>
                  
                  {exercises.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex} className="space-y-4 border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                          <Label htmlFor={`exercise-${exerciseIndex}`} className="mb-2 block">
                            Exercise Name
                          </Label>
                          <Input 
                            id={`exercise-${exerciseIndex}`} 
                            value={exercise.name} 
                            onChange={(e) => handleExerciseNameChange(exerciseIndex, e.target.value)}
                            placeholder="e.g., Barbell Squat" 
                          />
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => removeExercise(exerciseIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="grid grid-cols-4 gap-2">
                          <div className="text-sm font-medium">Set</div>
                          <div className="text-sm font-medium">Weight (kg)</div>
                          <div className="text-sm font-medium">Reps</div>
                          <div className="text-sm font-medium">RPE</div>
                        </div>
                        
                        {exercise.sets.map((set, setIndex) => (
                          <div key={setIndex} className="grid grid-cols-4 gap-2 items-center">
                            <div className="text-sm font-medium">{setIndex + 1}</div>
                            <Input 
                              type="number" 
                              value={set.weight} 
                              onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'weight', e.target.value)}
                              placeholder="kg"
                              className="h-8"
                            />
                            <Input 
                              type="number" 
                              value={set.reps} 
                              onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'reps', e.target.value)}
                              placeholder="reps"
                              className="h-8"
                            />
                            <div className="flex gap-2">
                              <Input 
                                type="number" 
                                value={set.rpe} 
                                onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'rpe', e.target.value)}
                                placeholder="1-10"
                                className="h-8"
                              />
                              {exercise.sets.length > 1 && (
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8" 
                                  onClick={() => removeSet(exerciseIndex, setIndex)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2" 
                          onClick={() => addSet(exerciseIndex)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Set
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Workout</Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        </TabsContent>
        
        <TabsContent value="plan" className="mt-4">
          <AnimatedCard>
            <GlassCard>
              <div className="mb-4">
                <h3 className="text-lg font-medium">Your AI-Powered Workout Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Personalized based on your hormone levels, recovery status, and goals
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <WorkoutPlanCard />
                <WeeklyPlanCard />
              </div>
            </GlassCard>
          </AnimatedCard>
        </TabsContent>
        
        <TabsContent value="progress" className="mt-4">
          <AnimatedCard>
            <Card>
              <CardHeader>
                <CardTitle>Strength Progress Tracker</CardTitle>
                <CardDescription>Monitor your gains and achieve your strength goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" size="sm">Squat</Button>
                    <Button variant="outline" size="sm">Deadlift</Button>
                    <Button variant="outline" size="sm">Bench Press</Button>
                    <Button variant="outline" size="sm">Overhead Press</Button>
                    <Button variant="outline" size="sm">Row</Button>
                    <Button variant="outline" size="sm">+ Add Exercise</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">Squat Progress</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Current 1RM (Estimated)</span>
                        <span className="text-sm font-medium">85 kg</span>
                      </div>
                      
                      <div className="h-40">
                        {/* Progress chart would go here */}
                        <div className="w-full h-full flex items-center justify-center bg-secondary rounded-md">
                          <span className="text-muted-foreground">Strength progress chart</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground">Highest Weight</span>
                          <p className="text-sm font-medium">80 kg x 3 reps</p>
                          <span className="text-xs text-muted-foreground">Feb 25, 2023</span>
                        </div>
                        
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground">Most Recent</span>
                          <p className="text-sm font-medium">75 kg x 5 reps</p>
                          <span className="text-xs text-muted-foreground">Mar 15, 2023</span>
                        </div>
                      </div>
                      
                      <InsightPanel
                        type="info"
                        title="Hormonal Impact"
                        description="Your strength tends to peak during days 5-12 of your cycle when estrogen begins to rise and progesterone is low."
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkoutTracker;
