
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Exercise, ExerciseSet } from '@/utils/types';
import { PlusCircle, Trash2 } from 'lucide-react';

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
        <h3 className="text-lg font-medium">Exercises</h3>
        <Button type="button" variant="outline" size="sm" onClick={addExercise} className="flex items-center gap-1">
          <PlusCircle size={16} />
          Add Exercise
        </Button>
      </div>

      {exercises.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex} className="border rounded-md p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="w-full">
              <Label htmlFor={`exercise-${exerciseIndex}`}>Exercise Name</Label>
              <Input
                id={`exercise-${exerciseIndex}`}
                value={exercise.name}
                onChange={(e) => handleExerciseChange(exerciseIndex, 'name', e.target.value)}
                placeholder="e.g., Squat, Bench Press, etc."
                className="mt-1"
              />
            </div>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={() => removeExercise(exerciseIndex)}
              className="ml-2"
            >
              <Trash2 size={16} />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-2 font-medium text-sm">
              <div>Set</div>
              <div>Weight (kg)</div>
              <div>Reps</div>
              <div>RPE (1-10)</div>
            </div>
            
            {exercise.sets.map((set, setIndex) => (
              <div key={setIndex} className="grid grid-cols-4 gap-2 items-center">
                <div>{setIndex + 1}</div>
                <Input
                  type="number"
                  value={set.weight === undefined ? '' : set.weight}
                  onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'weight', e.target.value)}
                  placeholder="kg"
                />
                <Input
                  type="number"
                  value={set.reps === undefined ? '' : set.reps}
                  onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'reps', e.target.value)}
                  placeholder="reps"
                />
                <div className="flex items-center">
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={set.rpe === undefined ? '' : set.rpe}
                    onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'rpe', e.target.value)}
                    placeholder="1-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSet(exerciseIndex, setIndex)}
                    className="ml-1"
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
              className="mt-2 w-full flex items-center justify-center gap-1"
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
