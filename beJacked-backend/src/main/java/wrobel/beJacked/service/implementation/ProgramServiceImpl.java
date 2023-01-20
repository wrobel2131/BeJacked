package wrobel.beJacked.service.implementation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import wrobel.beJacked.DTO.ProgramDTO;
import wrobel.beJacked.DTO.WorkoutDTO;
import wrobel.beJacked.model.*;
import wrobel.beJacked.repository.ProgramRepository;
import wrobel.beJacked.repository.ProgramTypeRepository;
import wrobel.beJacked.repository.UserRepository;
import wrobel.beJacked.repository.WorkoutRepository;
import wrobel.beJacked.service.ExerciseService;
import wrobel.beJacked.service.ProgramService;
import wrobel.beJacked.service.UserService;
import wrobel.beJacked.service.WorkoutService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ProgramServiceImpl implements ProgramService {

    private final WorkoutService workoutService;
    private final ProgramRepository programRepository;
    private final ProgramTypeRepository programTypeRepository;

    private final ExerciseService exerciseService;
    private final UserService userService;


    @Override
    public Program saveProgram(Program program) {
        return programRepository.save(program);
    }

    @Override
    public List<Program> getUserPrograms(String username) {
        User user = userService.getUserByUsername(username);

        return programRepository.findProgramsByUser(user);
    }

    @Override
    public Program getUserProgramByName(String username, String programName) {
        User user = userService.getUserByUsername(username);

        return programRepository.findProgramByNameAndUser(programName, user);
    }

    public Program createEmptyProgram(ProgramDTO form) {
        Program program = new Program();
        program.setName(form.getName());
        program.setDescription(form.getDescription());
        ProgramType programType = programTypeRepository.findProgramTypeByName(form.getProgramType());
        program.setProgramType(programType);

        List<Workout> workouts = new ArrayList<>();
        program.setWorkouts(workouts);
        User user = userService.getUserByUsername(form.getUsername());
        program.setUser(user);
        return program;


    }

    public List<Workout> createWorkouts(Program program, ProgramDTO form) {
        List<Workout> workouts = new ArrayList<>();
        for(WorkoutDTO workoutDto: form.getWorkouts()) {
            Workout workout = new Workout();
            workout.setName(workoutDto.getName());
            workout.setProgram(program);
            List<Exercise> exercises = new ArrayList<>();
            for (String exerciseDto : workoutDto.getExercises()) {
                Exercise exercise = exerciseService.getExerciseByName(exerciseDto);
                exercises.add(exercise);
            }
            workout.setExercises(exercises);

            Workout w = workoutService.saveWorkout(workout);
            workouts.add(w);
        }

        return workouts;
    }

    @Override
    public ProgramType deleteProgramType(Long programTypeId) {
        return null;
    }

    @Override
    public ProgramType addProgramType(String name) {
        return null;
    }

    @Override
    public Program deleteProgram(Long programId) {
        return null;
    }

    @Override
    public Program addWorkoutsToProgram(Program program, List<Workout> workouts) {

        log.info(String.valueOf(program.getId()));

        for(Workout workout: workouts) {
            log.info(String.valueOf(workout.getId()));
            log.info(workout.getName());

            for (Exercise exercise: workout.getExercises()) {
                log.info(String.valueOf(exercise));
            }
        }

        program.setWorkouts(workouts);

        return program;
    }

//    @Override
//    public Workout convertDTOtoWorkout(WorkoutDTO form, Program program) {
//        Workout workout = new Workout();
//        workout.setName(form.getName());
//        workout.setProgram(program);
//        List<Exercise> exercises = new ArrayList<>();
//        for(String exercise: form.getExercises()) {
//            exercises.add(exerciseService.convertDTOtoExercise(exercise));
//        }
//        workout.setExercises(exercises);
//        return workout;
//    }


    @Override
    public ProgramType saveProgramType(ProgramType programType) {
        return programTypeRepository.save(programType);

    }

    @Override
    public List<ProgramType> getProgramTypes() {
        return programTypeRepository.findAll();
    }
}
