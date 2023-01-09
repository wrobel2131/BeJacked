package wrobel.beJacked.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import wrobel.beJacked.DTO.AddExerciseDTO;
import wrobel.beJacked.DTO.ProgramDTO;
import wrobel.beJacked.model.Exercise;
import wrobel.beJacked.model.Program;
import wrobel.beJacked.model.Workout;
import wrobel.beJacked.service.ProgramService;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/programs")
@Slf4j
public class ProgramController {

    private final ProgramService programService;

    @RolesAllowed({"ROLE_ADMIN", "ROLE_TRAINER", "ROLE_USER"})
    @PostMapping()
    Program addProgram(@RequestBody ProgramDTO form) {
        //TODO sprawdzenie przychodzacego exercise DTO
        log.info("in controller");
//        ProgramDTO programDTO = (ProgramDTO) form;
//        log.info(form.name);
//        log.info(programDTO.toString());
        log.info(String.valueOf(form));
        if(form == null) {
            throw new RuntimeException("not valid program ");
        }


        Program program = programService.createEmptyProgram(form);
        Program returnedProgram = programService.saveProgram(program);
        List<Workout> workouts= programService.createWorkouts(returnedProgram, form);
        Program programToReturn = programService.addWorkoutsToProgram(returnedProgram, workouts);


//        return "done";
        return programToReturn;
    }
}
