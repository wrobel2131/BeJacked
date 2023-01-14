package wrobel.beJacked.service;

import org.springframework.stereotype.Service;
import wrobel.beJacked.DTO.LogDTO;
import wrobel.beJacked.model.Exercise;
import wrobel.beJacked.model.Log;
import wrobel.beJacked.model.Workout;

import java.util.List;

@Service
public interface LogService {

    Log saveLog(Log log);


    List<Log> getLogsByDate(String date, Long exerciseId, Long workoutId);

    List<Log> getAllLogs();

    List<Log> getLogs(Long exerciseId, Long workoutId);

    Log convertDTOtoLog(LogDTO form);
}
