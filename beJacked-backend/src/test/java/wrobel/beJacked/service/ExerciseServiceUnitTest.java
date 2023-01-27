package wrobel.beJacked.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import wrobel.beJacked.DTO.AddExerciseDTO;
import wrobel.beJacked.DTO.ExerciseDTO;
import wrobel.beJacked.model.Exercise;
import wrobel.beJacked.model.ExerciseCategory;
import wrobel.beJacked.repository.ExerciseCategoryRepository;
import wrobel.beJacked.repository.ExerciseRepository;
import wrobel.beJacked.service.implementation.ExerciseServiceImpl;
import wrobel.beJacked.service.implementation.LogServiceImpl;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@Slf4j
class ExerciseServiceUnitTest {



    @Mock
    private ExerciseRepository exerciseRepository;

    @Mock
    private ExerciseCategoryRepository exerciseCategoryRepository;

    private ExerciseService exerciseService;

    @BeforeEach
    void setUp() {
        exerciseService = new ExerciseServiceImpl(exerciseRepository, exerciseCategoryRepository);
    }
    @Test
    void shouldSaveExercise() {
        //given
        Exercise exercise = new Exercise();

        //when
        exerciseService.saveExercise(exercise);

        //then
        verify(exerciseRepository).save(exercise);

    }

    @Test
    void shouldGetExerciseByName() {
        //given
        String exerciseName = "test-exercise";

        //when
        exerciseService.getExerciseByName(exerciseName);

        //then
        verify(exerciseRepository).findExerciseByName(exerciseName);
    }

    @Test
    void shouldGetExerciseById() {
        //given
        Long exerciseId = 2L;

        //when
        exerciseService.getExerciseById(exerciseId);

        //then
        verify(exerciseRepository).findExerciseById(exerciseId);
    }

    @Test
    void shouldGetExercisesByCategory() {
        //given
        String exerciseCategoryName = "test-category";

        //when
        exerciseService.getExercisesByCategory(exerciseCategoryName);

        //then
        verify(exerciseRepository).findExercisesByExerciseCategoryName(exerciseCategoryName);
    }

    @Test
    void shouldGetExercises() {
        //given

        //when
        exerciseService.getExercises();

        //then
        verify(exerciseRepository).findAll();
    }

    @Test
    void shouldConvertAddDTOtoExercise() {
        //given
        AddExerciseDTO form = new AddExerciseDTO();
        form.setExerciseCategory("test-category");
        ExerciseCategory exerciseCategory = new ExerciseCategory();
        when(exerciseCategoryRepository.findExerciseCategoryByName(form.getExerciseCategory())).thenReturn(exerciseCategory);

        //when
        Exercise expected = exerciseService.convertAddDTOtoExercise(form);

        //then
        assertThat(expected.getClass().equals(Exercise.class));
    }

    @Test
    void shouldConvertDTOtoExercise() {
        //given
        String exerciseName = "test-exercise";

        //when
        exerciseService.convertDTOtoExercise(exerciseName);

        //then
        verify(exerciseRepository).findExerciseByName(exerciseName);
    }

    @Test
    void shouldGetExerciseCategory() {
        //given
        String exerciseCategoryName = "test-category";

        //when
        exerciseService.getExerciseCategory(exerciseCategoryName);

        //then
        verify(exerciseCategoryRepository).findExerciseCategoryByName(exerciseCategoryName);
    }

    @Test
    void shouldGetExerciseCategories() {
        //given

        //when
        exerciseService.getExerciseCategories();

        //then
        verify(exerciseCategoryRepository).findAll();
    }

    @Test
    void shouldSaveExerciseCategory() {
        //given
        String exerciseCategoryName = "test-category";
        ExerciseCategory exerciseCategory = new ExerciseCategory();
        exerciseCategory.setName(exerciseCategoryName);
        //when
        exerciseService.saveExerciseCategory(exerciseCategory);

        //then
        verify(exerciseCategoryRepository).save(exerciseCategory);
    }

    @Test
    void shouldSetExerciseCategory() {
        //given
        String exerciseName = "test-exercise";
        String exerciseCategoryName = "test-category";
        Exercise exercise = new Exercise();
        ExerciseCategory exerciseCategory = new ExerciseCategory();

        when(exerciseRepository.findExerciseByName(exerciseName)).thenReturn(exercise);
        when(exerciseCategoryRepository.findExerciseCategoryByName(exerciseCategoryName)).thenReturn(exerciseCategory);

        //when
        exerciseService.setExerciseCategory(exerciseName, exerciseCategoryName);

        //then
        assertThat(exercise.getExerciseCategory().equals(exerciseCategoryName));
    }
}