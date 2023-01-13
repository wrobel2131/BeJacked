package wrobel.beJacked.service.implementation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import wrobel.beJacked.DTO.LogDTO;
import wrobel.beJacked.model.Exercise;
import wrobel.beJacked.model.Log;
import wrobel.beJacked.model.Workout;
import wrobel.beJacked.repository.LogRepository;
import wrobel.beJacked.service.ExerciseService;
import wrobel.beJacked.service.LogService;
import wrobel.beJacked.service.WorkoutService;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class LogServiceImpl implements LogService {

    private final LogRepository logRepository;
    private final ExerciseService exerciseService;
    private final WorkoutService workoutService;

    @Override
    public Log saveLog(Log log) {
        return logRepository.save(log);
    }

    @Override
    public List<Log> getLogsByDate(String date, Long exerciseId, Long workoutId) {
        Date dateSql = Date.valueOf(date);
        Exercise exercise = exerciseService.getExerciseById(exerciseId);
        Workout workout = workoutService.getWorkoutById(workoutId);
        return logRepository.findLogsByExerciseAndWorkoutAndDate(exercise, workout, dateSql);

    }

    @Override
    public List<Log> getAllLogs() {
        return logRepository.findAll();
    }

    @Override
    public List<Log> getLogs(Long exerciseId, Long workoutId) {
        Exercise exercise = exerciseService.getExerciseById(exerciseId);
        Workout workout = workoutService.getWorkoutById(workoutId);
        return logRepository.findLogsByExerciseAndWorkout(exercise, workout);
    }

    @Override
    public Log convertDTOtoLog(LogDTO form) {
        Log exerciseLog = new Log();
        exerciseLog.setDate(Date.valueOf(form.getDate()));
        Exercise exercise = exerciseService.getExerciseByName(form.getExerciseName());
        exerciseLog.setExercise(exercise);
        exerciseLog.setSetNumber(form.getSetNumber());
        exerciseLog.setReps(form.getReps());
        exerciseLog.setWeight(form.getWeight());
        exerciseLog.setRpe(form.getRpe());
        exerciseLog.setTempo(form.getTempo());
        Workout workout = workoutService.getWorkoutById(form.getWorkoutId());
        exerciseLog.setWorkout(workout);
        return exerciseLog;
    }


}
