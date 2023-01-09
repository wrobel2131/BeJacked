import { ExerciseCategory } from './exercise-category';

export interface Exercise {
  id?: number;
  name: string;
  description: string;
  muscles: string;
  exerciseCategory: ExerciseCategory;
}
