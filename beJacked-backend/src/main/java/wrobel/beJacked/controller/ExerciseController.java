package wrobel.beJacked.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import wrobel.beJacked.DTO.ExerciseDTO;
import wrobel.beJacked.model.Exercise;
import wrobel.beJacked.model.ExerciseCategory;
import wrobel.beJacked.service.ExerciseService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/exercises")
public class ExerciseController {
    private final ExerciseService exerciseService;

    @GetMapping()
    List<Exercise> getExercises() {
        return exerciseService.getExercises();
    }

    @GetMapping(path = "/{exerciseName}")
    Exercise getExerciseByName(@PathVariable String exerciseName) {
        //TODO check of exercise exists
        return exerciseService.getExerciseByName(exerciseName);
    }


    @PostMapping()
    Exercise addExercise(@RequestBody ExerciseDTO form) {
        //TODO sprawdzenie przychodzacego exercise DTO
        if(form == null) {
            throw new RuntimeException("not valid exercise ");
        }
        Exercise exercise = exerciseService.convertDTOtoExercise(form);
        return exerciseService.saveExercise(exercise);

    }

    @GetMapping(path = "/category/{categoryName}")
    List<Exercise> getExercisesByCategory(@PathVariable String categoryName) {
        //TODO check if category exists
        return exerciseService.getExercisesByCategory(categoryName);
    }

    @GetMapping(path = "/category")
    List<ExerciseCategory> getExerciseCategories() {
        return exerciseService.getExerciseCategories();
    }


}
