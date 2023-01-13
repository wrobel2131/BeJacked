package wrobel.beJacked.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wrobel.beJacked.model.Exercise;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    Exercise findExerciseByName(String name);

    Exercise findExerciseById(Long id);
    List<Exercise> findExercisesByExerciseCategoryName(String exerciseCategory);

}
