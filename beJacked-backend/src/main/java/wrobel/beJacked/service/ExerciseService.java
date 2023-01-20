package wrobel.beJacked.service;


import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import wrobel.beJacked.DTO.AddExerciseDTO;
import wrobel.beJacked.DTO.ExerciseDTO;
import wrobel.beJacked.model.Exercise;
import wrobel.beJacked.model.ExerciseCategory;

import java.util.List;

@Service
public interface ExerciseService {
    Exercise saveExercise(Exercise exercise);
    Exercise getExerciseByName(String name);

    Exercise getExerciseById(Long id);
    List<Exercise> getExercisesByCategory(String exerciseCategory);
    List<Exercise> getExercises();
    Exercise convertAddDTOtoExercise(AddExerciseDTO form);
    Exercise convertDTOtoExercise(String exerciseName);

    ExerciseCategory getExerciseCategory(String exerciseCategory);
    List<ExerciseCategory> getExerciseCategories();
    ExerciseCategory saveExerciseCategory(String name);


    void setExerciseCategory(String exerciseName, String categoryName);

    //TODO methods to implement
    ExerciseCategory deleteExerciseCategory( String categoryName);
    Exercise deleteExercise( Long exerciseId);

}
