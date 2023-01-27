package wrobel.beJacked.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import wrobel.beJacked.DTO.LogDTO;
import wrobel.beJacked.model.Exercise;
import wrobel.beJacked.model.Log;
import wrobel.beJacked.model.Workout;
import wrobel.beJacked.repository.LogRepository;
import wrobel.beJacked.service.implementation.LogServiceImpl;
import wrobel.beJacked.service.implementation.ProgramServiceImpl;

import java.sql.Date;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@Slf4j
class LogServiceUnitTest {

    @Mock
    private LogRepository logRepository;
    @Mock
    private ExerciseService exerciseService;
    @Mock
    private WorkoutService workoutService;

    private LogService logService;

    @BeforeEach
    void setUp() {
        logService = new LogServiceImpl(logRepository, exerciseService, workoutService);
    }

    @Test
    void saveLog() {
        //given
        Log log = new Log();

        //when
        logService.saveLog(log);

        //then
        verify(logRepository).save(log);
    }

    @Test
    void getLogsByDate() {
        //given
        String date = "1999-02-20";
        Date dateSql = Date.valueOf(date);
        Long exerciseId = 1L;
        Long workoutId = 2L;
        Exercise exercise = new Exercise();
        Workout workout = new Workout();
        when(exerciseService.getExerciseById(exerciseId)).thenReturn(exercise);
        when(workoutService.getWorkoutById(workoutId)).thenReturn(workout);
        //when
        logService.getLogsByDate(date, exerciseId, workoutId);

        //then
        verify(logRepository).findLogsByExerciseAndWorkoutAndDate(exercise, workout, dateSql);
    }

    @Test
    void getAllLogs() {
        //given

        //when
        logService.getAllLogs();

        //then
        verify(logRepository).findAll();
    }

    @Test
    void getLogs() {
        //given
        Exercise exercise = new Exercise();
        Workout workout = new Workout();
        Long exerciseId = 1L;
        Long workoutId = 2L;
        when(exerciseService.getExerciseById(exerciseId)).thenReturn(exercise);
        when(workoutService.getWorkoutById(workoutId)).thenReturn(workout);

        //when
        logService.getLogs(exerciseId, workoutId);

        //then
        verify(logRepository).findLogsByExerciseAndWorkout(exercise, workout);
    }

    @Test
    void convertDTOtoLog() {
        //given
        LogDTO form = new LogDTO();
        form.setDate("1999-02-20");
        form.setExerciseName("test-exercise");
        form.setWorkoutId(1L);
        Exercise exercise = new Exercise();
        Workout workout = new Workout();
        when(exerciseService.getExerciseByName(form.getExerciseName())).thenReturn(exercise);
        when(workoutService.getWorkoutById(form.getWorkoutId())).thenReturn(workout);

        //when
        Log expected = logService.convertDTOtoLog(form);

        //then
        assertThat(expected.getClass().equals(Log.class));
    }
}