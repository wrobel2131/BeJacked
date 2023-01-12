package wrobel.beJacked.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wrobel.beJacked.model.Log;

@Repository
public interface LogRepository extends JpaRepository<Log, Long> {

}
