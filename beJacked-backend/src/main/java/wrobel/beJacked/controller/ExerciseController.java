package wrobel.beJacked.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import wrobel.beJacked.DTO.AddExerciseDTO;
import wrobel.beJacked.model.Exercise;
import wrobel.beJacked.model.ExerciseCategory;
import wrobel.beJacked.service.ExerciseService;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/exercises")
@Slf4j
public class ExerciseController {
    private final ExerciseService exerciseService;

    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_TRAINER"})
    @GetMapping()
    public List<Exercise> getExercises() {
        return exerciseService.getExercises();
    }

    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_TRAINER"})
    @GetMapping(path = "/{exerciseName}")
    public Exercise getExerciseByName(@PathVariable String exerciseName) {
        //TODO check of exercise exists
        return exerciseService.getExerciseByName(exerciseName);
    }




    @RolesAllowed("ROLE_ADMIN")
    @PostMapping()
    public Exercise addExercise(@RequestBody AddExerciseDTO form) {
        //TODO sprawdzenie przychodzacego exercise DTO
        log.info("in controller");
        if(form == null) {
            throw new RuntimeException("not valid exercise ");
        }
        log.info(form.getName());
        log.info(form.getDescription());
                log.info(form.getExerciseCategory());
        log.info(form.getMuscles());
        Exercise exercise = exerciseService.convertAddDTOtoExercise(form);
        return exerciseService.saveExercise(exercise);

    }

    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_TRAINER"})
    @GetMapping(path = "/category/{categoryName}")
    public List<Exercise> getExercisesByCategory(@PathVariable String categoryName) {
        //TODO check if category exists
        return exerciseService.getExercisesByCategory(categoryName);
    }

    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_TRAINER"})
    @GetMapping(path = "/category")
    public List<ExerciseCategory> getExerciseCategories() {
        return exerciseService.getExerciseCategories();
    }


    @RolesAllowed("ROLE_ADMIN")
    @PostMapping(path = "/category/{categoryName}")
    public ExerciseCategory addExerciseCategory(@PathVariable String categoryName) {
        ExerciseCategory exerciseCategory = new ExerciseCategory();
        exerciseCategory.setName(categoryName);
        return exerciseService.saveExerciseCategory(exerciseCategory);
    }

    //TODO methods to implement

    @RolesAllowed({"ROLE_ADMIN"})
    @DeleteMapping(path = "/category/{categoryName}")
    public ExerciseCategory deleteExerciseCategory(@PathVariable String categoryName) {
        return null;
    }

    @RolesAllowed({"ROLE_ADMIN"})
    @DeleteMapping(path = "/{exerciseId}")
    public Exercise deleteExercise(@PathVariable Long exerciseId) {
        return null;
    }


}
