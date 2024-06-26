package wrobel.beJacked.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import wrobel.beJacked.DTO.LogDTO;
import wrobel.beJacked.model.Exercise;
import wrobel.beJacked.model.Log;
import wrobel.beJacked.service.LogService;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/logs")
@Slf4j
public class LogController {

    private final LogService logService;


    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_TRAINER"})
    @PostMapping
    public Log addLog(@RequestBody LogDTO form) {
        Log log = logService.convertDTOtoLog(form);
        return logService.saveLog(log);
    }

    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_TRAINER"})
    @GetMapping("/{workoutId}/{exerciseId}/{date}")
    public List<Log> getLogsByWorkoutExerciseDate(@PathVariable Long workoutId, @PathVariable Long exerciseId, @PathVariable String date) {

        return logService.getLogsByDate(date, exerciseId, workoutId);
    }

    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_TRAINER"})
    @GetMapping("/{workoutId}/{exerciseId}")
    public List<Log> getLogsByWorkoutExercise(@PathVariable Long workoutId, @PathVariable Long exerciseId) {

        return logService.getLogs(exerciseId, workoutId);
    }

    //TODO methods to implement

    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_TRAINER"})
    @DeleteMapping("/{workoutId}/{exerciseId}")
    public List<Log> deleteLogsByWorkoutExercise(@PathVariable Long workoutId, @PathVariable Long exerciseId) {
        return null;
    }

    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_TRAINER"})
    @DeleteMapping("/{workoutId}/{exerciseId}/{date}")
    public List<Log> deleteLogsByWorkoutExerciseDate(@PathVariable Long workoutId, @PathVariable Long exerciseId, @PathVariable String date) {
        return null;
    }

    @RolesAllowed({"ROLE_ADMIN"})
    @DeleteMapping("/userId")
    public List<Log> deleteUserLogs( @PathVariable Long userId) {
        return null;
    }

}
