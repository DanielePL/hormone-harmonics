
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { Exercise } from '@/utils/types';

interface ExerciseFormProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

const ExerciseForm = ({ exercises, setExercises }: ExerciseFormProps) => {
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
  );
};

export default ExerciseForm;
