package wrobel.beJacked.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import wrobel.beJacked.DTO.ProgramDTO;
import wrobel.beJacked.DTO.WorkoutDTO;
import wrobel.beJacked.model.*;
import wrobel.beJacked.repository.ProgramRepository;
import wrobel.beJacked.repository.ProgramTypeRepository;
import wrobel.beJacked.service.implementation.ProgramServiceImpl;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@Slf4j
class ProgramServiceUnitTest {



    @Mock
    private WorkoutService workoutService;
    @Mock
    private ProgramRepository programRepository;
    @Mock
    private ProgramTypeRepository programTypeRepository;

    @Mock
    private ExerciseService exerciseService;
    @Mock
    private UserService userService;

    private ProgramService programService;

    @BeforeEach
    void setUp() {
        programService = new ProgramServiceImpl(workoutService, programRepository, programTypeRepository, exerciseService, userService);
    }

    @Test
    void shouldSaveProgram() {
        //given
        Program program = new Program();
        //when
        programService.saveProgram(program);

        //then
        verify(programRepository).save(program);
    }

    @Test
    void shouldGetUserPrograms() {
        //given
        String username = "test_user";
        User user = new User();
        when(userService.getUserByUsername(username)).thenReturn(user);

        //when
        programService.getUserPrograms(username);

        //then
        verify(programRepository).findProgramsByUser(user);
    }

    @Test
    void shouldGetUserProgramByName() {
        //given
        String username = "test_user";
        String programName = "test_program";
        User user = new User();
        when(userService.getUserByUsername(username)).thenReturn(user);

        //when
        programService.getUserProgramByName(username, programName);

        //then
        verify(programRepository).findProgramByNameAndUser(programName, user);
    }

    @Test
    void shouldAddWorkoutsToProgram() {
        //given
        Program program = new Program();
        List<Workout> testWorkoutList = new ArrayList<>();
        Random rand = new Random();
        for (int i =0; i < 4 ; i++) {
            Workout workout = new Workout();
            workout.setName("Workout: " + i);
            List<Exercise> exercises = new ArrayList<>();


            int randomExerciseNum = rand.nextInt(5)+1;
            for(int j = 0; j < randomExerciseNum; j++) {
                Exercise exercise = new Exercise();
                exercise.setName("exercise: " + j);
                exercises.add(exercise);
            }
            workout.setExercises(exercises);
            testWorkoutList.add(workout);
        }

        //when
        Program expected = programService.addWorkoutsToProgram(program, testWorkoutList);

        //then
        assertThat(expected.getWorkouts()).isEqualTo(testWorkoutList);
    }

    @Test
    void shouldSaveProgramType() {
        //given
        ProgramType programType = new ProgramType();

        //when
        programService.saveProgramType(programType);

        //then
        verify(programTypeRepository).save(programType);
    }

    @Test
    void shouldGetProgramTypes() {
        //given

        //when
        programService.getProgramTypes();

        //then
        verify(programTypeRepository).findAll();
    }

    @Test
    void shouldCreateEmptyProgram() {
        //given
        ProgramDTO form = new ProgramDTO();
        ProgramType programType = new ProgramType();
        User user = new User();
        when(programTypeRepository.findProgramTypeByName(form.getProgramType())).thenReturn(programType);
        when(userService.getUserByUsername(form.getUsername())).thenReturn(user);

        //when
        Program expected = programService.createEmptyProgram(form);

        //then
        assertThat(expected.getUser().equals(user) && expected.getProgramType().equals(programType) && expected.getClass().equals(Program.class)).isTrue();
    }

    @Test
    void shouldCreateWorkouts() {
        //given
        Program program = new Program();
        ProgramDTO form = new ProgramDTO();
        List<WorkoutDTO> workoutsDTOs= new ArrayList<>();
        form.setWorkouts(workoutsDTOs);
        lenient().when(exerciseService.getExerciseByName(anyString())).thenReturn(new Exercise());

        //when
        List<Workout> expected = programService.createWorkouts(program, form);

        //then
        assertThat(expected!=null).isTrue();
    }
}