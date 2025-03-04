
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Exercise, ExerciseSet } from '@/utils/types';
import { PlusCircle, Trash2, Dumbbell, Weight, BarChart } from 'lucide-react';

interface ExerciseFormProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ exercises, setExercises }) => {
  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: [{ weight: undefined, reps: undefined, rpe: undefined }] }]);
  };

  const removeExercise = (index: number) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
  };

  const addSet = (exerciseIndex: number) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets.push({ weight: undefined, reps: undefined, rpe: undefined });
    setExercises(updatedExercises);
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets.splice(setIndex, 1);
    setExercises(updatedExercises);
  };

  const handleExerciseChange = (exerciseIndex: number, field: string, value: string) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex] = { ...updatedExercises[exerciseIndex], [field]: value };
    setExercises(updatedExercises);
  };

  const handleSetChange = (exerciseIndex: number, setIndex: number, field: keyof ExerciseSet, value: string) => {
    const updatedExercises = [...exercises];
    const numValue = value === '' ? undefined : Number(value);
    updatedExercises[exerciseIndex].sets[setIndex] = {
      ...updatedExercises[exerciseIndex].sets[setIndex],
      [field]: numValue
    };
    setExercises(updatedExercises);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium refined-heading">Exercises</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={addExercise} 
          className="flex items-center gap-1 rounded-full px-4 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
        >
          <PlusCircle size={16} />
          Add Exercise
        </Button>
      </div>

      {exercises.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex} className="elegant-card p-5 bg-white/50 dark:bg-black/10 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <div className="w-full">
              <Label htmlFor={`exercise-${exerciseIndex}`}>Exercise Name</Label>
              <div className="relative mt-1">
                <Input
                  id={`exercise-${exerciseIndex}`}
                  value={exercise.name}
                  onChange={(e) => handleExerciseChange(exerciseIndex, 'name', e.target.value)}
                  placeholder="e.g., Squat, Bench Press, etc."
                  className="pl-10 form-field-validated border-0 shadow-sm focus:shadow-md"
                />
                <Dumbbell className="absolute left-3 top-2.5 h-5 w-5 text-primary/70" />
              </div>
            </div>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={() => removeExercise(exerciseIndex)}
              className="ml-2 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 rounded-full h-9 w-9 p-0"
            >
              <Trash2 size={16} />
            </Button>
          </div>

          <div className="space-y-3 mt-4">
            <div className="grid grid-cols-4 gap-2 font-medium text-sm text-muted-foreground">
              <div>Set</div>
              <div>Weight (kg)</div>
              <div>Reps</div>
              <div>RPE (1-10)</div>
            </div>
            
            {exercise.sets.map((set, setIndex) => (
              <div key={setIndex} className="grid grid-cols-4 gap-2 items-center">
                <div className="font-medium text-center rounded-full bg-accent/30 w-8 h-8 flex items-center justify-center">
                  {setIndex + 1}
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    value={set.weight === undefined ? '' : set.weight}
                    onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'weight', e.target.value)}
                    placeholder="kg"
                    className="pl-8 form-field-validated border-0 shadow-sm focus:shadow-md"
                  />
                  <Weight size={14} className="absolute left-2.5 top-3 text-primary/70" />
                </div>
                <Input
                  type="number"
                  value={set.reps === undefined ? '' : set.reps}
                  onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'reps', e.target.value)}
                  placeholder="reps"
                  className="form-field-validated border-0 shadow-sm focus:shadow-md"
                />
                <div className="flex items-center">
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={set.rpe === undefined ? '' : set.rpe}
                      onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'rpe', e.target.value)}
                      placeholder="1-10"
                      className="pl-8 form-field-validated border-0 shadow-sm focus:shadow-md"
                    />
                    <BarChart size={14} className="absolute left-2.5 top-3 text-primary/70" />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSet(exerciseIndex, setIndex)}
                    className="ml-1 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 rounded-full h-8 w-8 p-0 flex items-center justify-center"
                    disabled={exercise.sets.length <= 1}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addSet(exerciseIndex)}
              className="mt-3 w-full flex items-center justify-center gap-1 border-dashed bg-transparent hover:bg-accent/10"
            >
              <PlusCircle size={14} />
              Add Set
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExerciseForm;
