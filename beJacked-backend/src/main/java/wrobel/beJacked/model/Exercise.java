package wrobel.beJacked.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
//@RequiredArgsConstructor
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

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "muscles")
    private String muscles;

    @ManyToMany(mappedBy = "exercises", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private Collection<Workout> workouts;

//    @OneToMany(mappedBy = "exercise")
//    private Set<ExerciseWorkout> exerciseWorkouts = new HashSet<>();



    @ManyToOne
    @JoinColumn(name = "exercise_category_id")
//    @JsonIgnore
    private ExerciseCategory exerciseCategory;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Exercise exercise = (Exercise) o;
        return id != null && Objects.equals(id, exercise.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
