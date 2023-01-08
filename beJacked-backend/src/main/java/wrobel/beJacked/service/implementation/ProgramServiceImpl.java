package wrobel.beJacked.service.implementation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import wrobel.beJacked.DTO.ExerciseDTO;
import wrobel.beJacked.DTO.ProgramDTO;
import wrobel.beJacked.DTO.WorkoutDTO;
import wrobel.beJacked.model.*;
import wrobel.beJacked.repository.ProgramRepository;
import wrobel.beJacked.repository.ProgramTypeRepository;
import wrobel.beJacked.repository.UserRepository;
import wrobel.beJacked.service.ExerciseService;
import wrobel.beJacked.service.ProgramService;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ProgramServiceImpl implements ProgramService {

    private final ProgramRepository programRepository;
    private final ProgramTypeRepository programTypeRepository;

    private final ExerciseService exerciseService;
    private final UserRepository userRepository;


    @Override
    public Program saveProgram(Program program) {
        return programRepository.save(program);
    }

    @Override
    public List<Program> getUserPrograms(String username) {
        User user = userRepository.findByUsername(username);

        return programRepository.findProgramsByUser(user);
    }

    @Override
    public Program getUserProgramByName(String username, String programName) {
        User user = userRepository.findByUsername(username);

        return programRepository.findProgramByNameAndUser(programName, user);
    }

    @Override
    public Program convertDTOtoProgram(ProgramDTO form) {
        Program program = new Program();
        program.setName(form.getName());
        program.setDescription(form.getDescription());
        ProgramType programType = programTypeRepository.findProgramTypeByName(form.getProgramType());
        program.setProgramType(programType);

        for(WorkoutDTO workout: form.getWorkouts()) {

        }
        User user = userRepository.findByUsername(form.getUsername());
        program.setUser(user);

        return program;
    }

    @Override
    public Workout convertDTOtoWorkout(WorkoutDTO form, Program program) {
        Workout workout = new Workout();
        workout.setName(form.getName());
        workout.setProgram(program);
        Set<Exercise> exercises = new HashSet<>();
        for(ExerciseDTO exercise: form.getExercises()) {
            exercises.add(exerciseService.convertDTOtoExercise(exercise));
        }
        workout.setExercises(exercises);
        return workout;
    }


    @Override
    public ProgramType saveProgramType(ProgramType programType) {
        return programTypeRepository.save(programType);

    }

    @Override
    public List<ProgramType> getProgramTypes() {
        return programTypeRepository.findAll();
    }
}
