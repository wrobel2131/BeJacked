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

    Program convertDTOtoProgram(ProgramDTO form);

    Workout convertDTOtoWorkout(WorkoutDTO form, Program program);

    ProgramType saveProgramType(ProgramType programType);
    List<ProgramType> getProgramTypes();


}
