package wrobel.beJacked.service;

import org.springframework.stereotype.Service;
import wrobel.beJacked.model.Role;
import wrobel.beJacked.model.User;

import java.util.List;
import java.util.Set;

@Service
public interface UserService {
    User saveUser(User user);
    User getUserByUsername(String username);
    User getUserByEmail(String email);
    List<User> getUsers();
    Role saveRole(Role role);
    void addRoleToUser(String username, String roleName);
    List<User> getUsersByRoles(Set<Role> roles);
    Boolean doesUserExists(String username, String email);
}
