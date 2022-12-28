package wrobel.beJacked.service;


import org.springframework.stereotype.Service;
import wrobel.beJacked.DTO.ExerciseDTO;
import wrobel.beJacked.model.Exercise;
import wrobel.beJacked.model.ExerciseCategory;

import java.util.List;

@Service
public interface ExerciseService {
    Exercise saveExercise(Exercise exercise);
    Exercise getExerciseByName(String name);
    List<Exercise> getExercisesByCategory(String exerciseCategory);
    List<Exercise> getExercises();
    Exercise convertDTOtoExercise(ExerciseDTO form);

    ExerciseCategory getExerciseCategory(String exerciseCategory);
    List<ExerciseCategory> getExerciseCategories();
    ExerciseCategory saveExerciseCategory(String name);


    void setExerciseCategory(String exerciseName, String categoryName);


}
