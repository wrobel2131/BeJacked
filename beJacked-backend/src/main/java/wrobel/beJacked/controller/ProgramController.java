package wrobel.beJacked.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import wrobel.beJacked.DTO.AddExerciseDTO;
import wrobel.beJacked.DTO.ProgramDTO;
import wrobel.beJacked.model.Exercise;
import wrobel.beJacked.model.Program;
import wrobel.beJacked.model.ProgramType;
import wrobel.beJacked.model.Workout;
import wrobel.beJacked.service.ProgramService;

import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/programs")
@Slf4j
public class ProgramController {

    private final ProgramService programService;
    private final HttpServletRequest request;
    @RolesAllowed({"ROLE_ADMIN", "ROLE_TRAINER", "ROLE_USER"})
    @GetMapping()
    public List<Program> getPrograms(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();

        return programService.getUserPrograms(principal.getName());
    }

    @RolesAllowed({"ROLE_ADMIN", "ROLE_TRAINER", "ROLE_USER"})
    @PostMapping()
    public Program addProgram(@RequestBody ProgramDTO form) {
        log.info("in controller");

        log.info(String.valueOf(form));
        if(form == null) {
            throw new RuntimeException("not valid program ");
        }

        Principal principal = request.getUserPrincipal();

        if(programService.getUserProgramByName(principal.getName(), form.getName()) != null) {
            throw new RuntimeException("program already exists");
        }


        Program program = programService.createEmptyProgram(form);
        Program returnedProgram = programService.saveProgram(program);
        List<Workout> workouts= programService.createWorkouts(returnedProgram, form);


//        return "done";
        return programService.addWorkoutsToProgram(returnedProgram, workouts);
    }




    @RolesAllowed({"ROLE_ADMIN", "ROLE_TRAINER", "ROLE_USER"})
    @GetMapping("/programTypes")
    public List<ProgramType> getProgramTypes() {
        return programService.getProgramTypes();
    }

    //TODO methods to implement

    @RolesAllowed({"ROLE_ADMIN"})
    @DeleteMapping("/programTypes/{programTypeId}")
    public Program deleteProgramTypes(@PathVariable Long programTypeId) {
        return null;
    }

    @RolesAllowed({"ROLE_ADMIN"})
    @PostMapping("/programTypes")
    public Program addProgramType() {
        return null;
    }

    @RolesAllowed({"ROLE_ADMIN", "ROLE_TRAINER", "ROLE_USER"})
    @DeleteMapping("/{programId}")
    public Program deleteProgram(@PathVariable Long programId) {
        return null;
    }
}
