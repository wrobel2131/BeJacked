package wrobel.beJacked.service;

import org.springframework.stereotype.Service;
import wrobel.beJacked.model.Role;
import wrobel.beJacked.model.User;

import java.util.List;

@Service
public interface UserService {
    User saveUser(User user);
    Role saveRole(Role role);
    void addRoleToUser(String username, String roleName);
    User getUserByUsername(String username);
    User getUserByEmail(String email);
    List<User> getUsers();
    Boolean doesUserExists(String username, String email);
}
