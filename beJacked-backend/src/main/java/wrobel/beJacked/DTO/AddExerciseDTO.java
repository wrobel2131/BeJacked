package wrobel.beJacked.DTO;

import lombok.Data;

@Data
public class AddExerciseDTO {
    private String name;
    private String description;
    private String muscles;
    private String exerciseCategory;
}
