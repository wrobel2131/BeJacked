package wrobel.beJacked.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
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
    @JsonIgnore
    private Collection<Workout> workouts;

    @ManyToOne
    @JoinColumn(name = "exercise_category_id")
//    @JsonIgnore
    private ExerciseCategory exerciseCategory;
}
