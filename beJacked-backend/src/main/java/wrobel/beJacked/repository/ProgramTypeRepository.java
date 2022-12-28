package wrobel.beJacked.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wrobel.beJacked.model.ProgramType;

@Repository
public interface ProgramTypeRepository extends JpaRepository<ProgramType, Long> {
    ProgramType findProgramTypeByName(String name);
}
