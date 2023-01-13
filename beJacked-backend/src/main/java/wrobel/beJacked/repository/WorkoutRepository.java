package wrobel.beJacked.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wrobel.beJacked.model.Program;
import wrobel.beJacked.model.Workout;

import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    Workout findWorkoutByNameAndProgram(String name, Program program);
    List<Workout> findWorkoutsByProgram(Program program);

    Workout findWorkoutById(Long id);
}
