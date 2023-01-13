import { Exercise } from './exercise';
import { Workout } from './workout';

export interface Log {
  id?: number;
  workout: Workout;
  exercise: Exercise;
  setNumber: number;
  weight: number;
  reps: number;
  rpe?: number;
  tempo?: string;
  date: string;
}
