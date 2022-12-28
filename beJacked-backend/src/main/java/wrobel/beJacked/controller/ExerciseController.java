package wrobel.beJacked.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import wrobel.beJacked.DTO.ExerciseDTO;
import wrobel.beJacked.model.Exercise;
import wrobel.beJacked.model.ExerciseCategory;
import wrobel.beJacked.service.ExerciseService;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/exercises")
public class ExerciseController {
    private final ExerciseService exerciseService;

    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_TRAINER"})
    @GetMapping()
    List<Exercise> getExercises() {
        return exerciseService.getExercises();
    }

    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_TRAINER"})
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

    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_TRAINER"})

    @GetMapping(path = "/category/{categoryName}")
    List<Exercise> getExercisesByCategory(@PathVariable String categoryName) {
        //TODO check if category exists
        return exerciseService.getExercisesByCategory(categoryName);
    }

    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_TRAINER"})
    @GetMapping(path = "/category")
    List<ExerciseCategory> getExerciseCategories() {
        return exerciseService.getExerciseCategories();
    }


    @RolesAllowed("ROLE_ADMIN")
    @PostMapping(path = "/category/{categoryName}")
    ExerciseCategory addExerciseCategory(@PathVariable String categoryName) {
        return exerciseService.saveExerciseCategory(categoryName);
    }

}
