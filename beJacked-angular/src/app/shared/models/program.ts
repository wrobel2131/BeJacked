import { Workout } from './workout';

export interface Program {
  id?: number;
  name: string;
  description: string;
  programType: string;
  username: string;
  workouts: Workout[];
}
