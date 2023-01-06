package wrobel.beJacked.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wrobel.beJacked.model.Exercise;
import wrobel.beJacked.model.ExerciseCategory;

import java.util.List;


@Repository
public interface ExerciseCategoryRepository extends JpaRepository<ExerciseCategory, Long> {
    ExerciseCategory findExerciseCategoryByName(String name);
}
