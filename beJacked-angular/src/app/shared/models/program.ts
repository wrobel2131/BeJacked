import { ProgramType } from './program-type';
import { User } from './user';
import { Workout } from './workout';

export interface Program {
  id?: number;
  name: string;
  description: string;
  programType: ProgramType;
  user: User;
  workouts: Workout[];
}
