package wrobel.beJacked.service.implementation;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import wrobel.beJacked.model.Program;
import wrobel.beJacked.model.Workout;
import wrobel.beJacked.repository.WorkoutRepository;
import wrobel.beJacked.service.WorkoutService;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutRepository workoutRepository;
    @Override
    public Workout saveWorkout(Workout workout) {
        return workoutRepository.save(workout);
    }

    @Override
    public List<Workout> getProgramWorkouts(Program program) {
        return workoutRepository.findWorkoutsByProgram(program);
    }

    @Override
    public Workout getWorkoutById(Long id) {
        return workoutRepository.findWorkoutById(id);
    }
}
