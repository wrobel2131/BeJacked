package wrobel.beJacked.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import wrobel.beJacked.model.Program;
import wrobel.beJacked.model.Workout;
import wrobel.beJacked.repository.WorkoutRepository;
import wrobel.beJacked.service.implementation.WorkoutServiceImpl;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class WorkoutServiceUnitTest {

    @Mock private WorkoutRepository workoutRepository;
    private WorkoutService workoutService;

    @BeforeEach
    void setUp() {
        workoutService = new WorkoutServiceImpl(workoutRepository);
    }

    @Test
    void saveWorkout() {
        //given
       Workout workout = new Workout();
       //when
        workoutService.saveWorkout(workout);
        //then
        verify(workoutRepository).save(workout);
    }

    @Test
    void getProgramWorkouts() {
        //given
        Program program = new Program();
        //when
        workoutService.getProgramWorkouts(program);
        //then
        verify(workoutRepository).findWorkoutsByProgram(program);
    }

    @Test
    void getWorkoutById() {
        //given
        Long id = 1L;
        //when
        workoutService.getWorkoutById(id);
        //then
        verify(workoutRepository).findWorkoutById(id);
    }
}