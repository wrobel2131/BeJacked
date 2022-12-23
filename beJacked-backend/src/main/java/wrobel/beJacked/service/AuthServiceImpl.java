package wrobel.beJacked.service;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import wrobel.beJacked.DTO.UserRegisterDTO;
import wrobel.beJacked.model.Role;
import wrobel.beJacked.model.User;
import wrobel.beJacked.repository.RoleRepository;


@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final RoleRepository roleRepository;


    @Override
    public Boolean checkPasswords(String password, String confirmPassword) {
        return password.equals(confirmPassword);
    }

    @Override
    public User convertDTOtoUser(UserRegisterDTO form) {
        if(!checkPasswords(form.getPassword(), form.getConfirmPassword())) {
            throw new RuntimeException("Passwords are not the same");
        }
        User user = new User();
        user.setUsername(form.getUsername());
        user.setEmail(form.getEmail());
        user.setPassword(form.getPassword());
        user.setName(form.getName());
        user.setSurname(form.getSurname());
//        user.setProfilePicture(form.getProfilePicture());
        Role role = roleRepository.findByName(form.getRole());
        user.getRoles().add(role);

        return user;
    }
}
