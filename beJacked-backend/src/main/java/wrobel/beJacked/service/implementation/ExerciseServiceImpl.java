package wrobel.beJacked.service.implementation;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import wrobel.beJacked.DTO.AddExerciseDTO;
import wrobel.beJacked.DTO.ExerciseDTO;
import wrobel.beJacked.model.Exercise;
import wrobel.beJacked.model.ExerciseCategory;
import wrobel.beJacked.repository.ExerciseCategoryRepository;
import wrobel.beJacked.repository.ExerciseRepository;
import wrobel.beJacked.service.ExerciseService;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final ExerciseCategoryRepository exerciseCategoryRepository;

    @Override
    public Exercise saveExercise(Exercise exercise) {
        return exerciseRepository.save(exercise);
    }

    @Override
    public Exercise getExerciseByName(String name) {
        return exerciseRepository.findExerciseByName(name);
    }

    @Override
    public Exercise getExerciseById(Long id) {
        return exerciseRepository.findExerciseById(id);
    }

    @Override
    public List<Exercise> getExercisesByCategory(String exerciseCategory) {
        return exerciseRepository.findExercisesByExerciseCategoryName(exerciseCategory);
    }

    @Override
    public List<Exercise> getExercises() {
        return exerciseRepository.findAll();
    }

    @Override
    public Exercise convertAddDTOtoExercise(AddExerciseDTO form) {
        Exercise exercise = new Exercise();
        exercise.setName(form.getName());
        exercise.setDescription(form.getDescription());
        exercise.setMuscles(form.getMuscles());
        ExerciseCategory exerciseCategory = exerciseCategoryRepository.findExerciseCategoryByName(form.getExerciseCategory());
        exercise.setExerciseCategory(exerciseCategory);

        return exercise;
    }

    @Override
    public Exercise convertDTOtoExercise(String exerciseName) {
        Exercise exercise = exerciseRepository.findExerciseByName(exerciseName);
        return exercise;
    }

    @Override
    public ExerciseCategory getExerciseCategory(String exerciseCategory) {
        return exerciseCategoryRepository.findExerciseCategoryByName(exerciseCategory);
    }

    @Override
    public List<ExerciseCategory> getExerciseCategories() {
        return exerciseCategoryRepository.findAll();
    }

    @Override
    public ExerciseCategory saveExerciseCategory(String name) {
        ExerciseCategory exerciseCategory = new ExerciseCategory();
        exerciseCategory.setName(name);
        return exerciseCategoryRepository.save(exerciseCategory);
    }

    @Override
    public void setExerciseCategory(String exerciseName, String categoryName) {
        Exercise exercise = exerciseRepository.findExerciseByName(exerciseName);
        ExerciseCategory exerciseCategory = exerciseCategoryRepository.findExerciseCategoryByName(categoryName);
        exercise.setExerciseCategory(exerciseCategory);
    }


}
