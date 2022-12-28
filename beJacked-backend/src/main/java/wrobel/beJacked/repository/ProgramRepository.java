package wrobel.beJacked.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wrobel.beJacked.model.Program;
import wrobel.beJacked.model.User;

import java.util.List;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {
    Program findProgramByNameAndUser(String name, User user);
    List<Program> findProgramsByUser(User user);

}
