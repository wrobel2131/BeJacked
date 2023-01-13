package wrobel.beJacked.service;

import org.springframework.stereotype.Service;
import wrobel.beJacked.model.Program;
import wrobel.beJacked.model.Workout;

import java.util.List;

@Service
public interface WorkoutService {
    Workout saveWorkout(Workout workout);
    List<Workout> getProgramWorkouts(Program program);

    Workout getWorkoutById(Long id);

}
