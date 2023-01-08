package wrobel.beJacked.DTO;


import lombok.Data;

import java.util.List;

@Data
public class WorkoutDTO {
    private String name;
    private List<ExerciseDTO> exercises;
}
