package wrobel.beJacked.DTO;

import lombok.Data;

import java.util.List;

@Data
public class ProgramDTO {
    private String name;
    private String description;
    private String username;

    private List<WorkoutDTO> workouts;

    private String programType;
}
