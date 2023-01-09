import { ExerciseCategory } from './exercise-category';

export interface Exercise {
  name: string;
  description: string;
  muscles: string;
  exerciseCategory: ExerciseCategory;
}
