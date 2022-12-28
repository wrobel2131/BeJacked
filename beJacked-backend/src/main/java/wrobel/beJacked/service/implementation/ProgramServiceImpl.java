package wrobel.beJacked.service.implementation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import wrobel.beJacked.DTO.ProgramDTO;
import wrobel.beJacked.model.Program;
import wrobel.beJacked.model.ProgramType;
import wrobel.beJacked.model.User;
import wrobel.beJacked.repository.ProgramRepository;
import wrobel.beJacked.repository.ProgramTypeRepository;
import wrobel.beJacked.repository.UserRepository;
import wrobel.beJacked.service.ProgramService;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ProgramServiceImpl implements ProgramService {

    private final ProgramRepository programRepository;
    private final ProgramTypeRepository programTypeRepository;

    private final UserRepository userRepository;


    @Override
    public Program saveProgram(Program program) {
        return programRepository.save(program);
    }

    @Override
    public List<Program> getUserPrograms(String username) {
        User user = userRepository.findByUsername(username);

        return programRepository.findProgramsByUser(user);
    }

    @Override
    public Program getUserProgramByName(String username, String programName) {
        User user = userRepository.findByUsername(username);

        return programRepository.findProgramByNameAndUser(programName, user);
    }

    @Override
    public Program convertDTOtoProgram(ProgramDTO form) {
        Program program = new Program();

        program.setName(form.getName());
        program.setDescription(form.getDescription());
        User user = userRepository.findByUsername(form.getUsername());
        program.setUser(user);

        return program;
    }

    @Override
    public ProgramType saveProgramType(ProgramType programType) {
        return programTypeRepository.save(programType);

    }

    @Override
    public List<ProgramType> getProgramTypes() {
        return programTypeRepository.findAll();
    }
}
