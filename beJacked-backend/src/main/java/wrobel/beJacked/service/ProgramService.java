package wrobel.beJacked.service;


import org.springframework.stereotype.Service;
import wrobel.beJacked.DTO.ProgramDTO;
import wrobel.beJacked.DTO.WorkoutDTO;
import wrobel.beJacked.model.Program;
import wrobel.beJacked.model.ProgramType;
import wrobel.beJacked.model.Workout;

import java.util.List;

@Service
public interface ProgramService {
    Program saveProgram(Program program);
    List<Program> getUserPrograms(String username);
    Program getUserProgramByName(String username, String programName);

//    Program convertDTOtoProgram(ProgramDTO form);

//    Program addWorkoutsToProgram(Program program, ProgramDTO form);

    Program addWorkoutsToProgram(Program program, List<Workout> workouts);

    Workout convertDTOtoWorkout(WorkoutDTO form, Program program);

    ProgramType saveProgramType(ProgramType programType);
    List<ProgramType> getProgramTypes();

    Program createEmptyProgram(ProgramDTO form);

    List<Workout> createWorkouts(Program program, ProgramDTO form);



}
