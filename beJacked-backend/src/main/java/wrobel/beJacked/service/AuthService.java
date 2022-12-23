package wrobel.beJacked.service;

import org.springframework.stereotype.Service;
import wrobel.beJacked.DTO.UserRegisterDTO;
import wrobel.beJacked.model.User;

@Service
public interface AuthService {
    Boolean checkPasswords(String password, String confirmPassword);
    User convertDTOtoUser(UserRegisterDTO form);
}
