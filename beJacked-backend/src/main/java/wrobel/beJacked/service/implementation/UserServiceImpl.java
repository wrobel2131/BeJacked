package wrobel.beJacked.service.implementation;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import wrobel.beJacked.model.Role;
import wrobel.beJacked.model.User;
import wrobel.beJacked.repository.RoleRepository;
import wrobel.beJacked.repository.UserRepository;
import wrobel.beJacked.service.UserService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException("user not found");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {authorities.add(new SimpleGrantedAuthority(role.getName()));});
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }


    @Override
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
    }


    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User getUserByEmail(String email) {

        log.info("find user by email: " + email);
        return userRepository.findUserByEmail(email);
    }

    @Override
    public List<User> getUsers() {
        log.info("get users");
        return userRepository.findAll();
    }

//    @Override
//    public List<User> getUsersByRoles(Set<Role> roles) {
//        return userRepository.findUsersByRoles(roles);
//    }

    @Override
    public Boolean doesUserExists(String username, String email) {
        return userRepository.findByUsername(username) != null || userRepository.findUserByEmail(email) != null;

    }

    @Override
    public User deleteUser(Long userId) {
        return null;
    }

    @Override
    public User updateUser(Long userId) {
        return null;
    }

    @Override
    public Role deleteRole(Role role) {
        return null;
    }
}
