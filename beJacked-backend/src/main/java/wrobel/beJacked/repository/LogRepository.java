package wrobel.beJacked.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wrobel.beJacked.model.Exercise;
import wrobel.beJacked.model.Log;
import wrobel.beJacked.model.Workout;

import java.sql.Date;
import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<Log, Long> {

    List<Log> findLogsByExerciseAndWorkout(Exercise exercise, Workout workout);

    List<Log> findLogsByExerciseAndWorkoutAndDate(Exercise exercise, Workout workout, Date date);
}
