import { User } from './user';
import { Workout } from './workout';

export interface Program {
  id?: number;
  name: string;
  description: string;
  programType: string;
  user: User;
  workouts: Workout[];
}
