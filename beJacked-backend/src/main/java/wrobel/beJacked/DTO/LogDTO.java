package wrobel.beJacked.DTO;

import lombok.Data;

@Data
public class LogDTO {
    private Integer setNumber;
    private Integer reps;
    private Double weight;
    private String tempo;
    private Double rpe;
    private String exerciseName;
    private Long workoutId;

    private String date;
}
