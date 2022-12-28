package wrobel.beJacked.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "exercise")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "muscles")
    private String muscles;

    @ManyToMany(mappedBy = "exercises", fetch = FetchType.LAZY)
    private List<Workout> workouts = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "exercise_category_id")
    private ExerciseCategory exerciseCategory;
}
