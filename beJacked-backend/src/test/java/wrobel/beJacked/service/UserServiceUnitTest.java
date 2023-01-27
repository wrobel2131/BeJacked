package wrobel.beJacked.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import wrobel.beJacked.model.Role;
import wrobel.beJacked.model.User;
import wrobel.beJacked.repository.RoleRepository;
import wrobel.beJacked.repository.UserRepository;
import wrobel.beJacked.service.implementation.UserServiceImpl;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@Slf4j
class UserServiceUnitTest {


    @Mock private UserRepository userRepository;
    @Mock private RoleRepository roleRepository;
    @Mock private PasswordEncoder passwordEncoder;

    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserServiceImpl(userRepository, roleRepository, passwordEncoder);
    }
    @Test
    void shouldSaveUser() {
        //given
        User user = new User();

        //when
        userService.saveUser(user);

        //then
        verify(userRepository).save(user);

    }

    @Test
    void shouldGetUserByUsername() {
        //given
        String username = "test_user";

        //when
        userService.getUserByUsername(username);

        //then
        verify(userRepository).findByUsername(username);

    }

    @Test
    void shouldGetUserByEmail() {
        //given
        String email = "test_email@gmail.com";

        //when
        userService.getUserByEmail(email);

        //then
        verify(userRepository).findUserByEmail(email);

    }

    @Test
    void shouldGetUsers() {
        //given

        //when
        userService.getUsers();


        //then
        verify(userRepository).findAll();
    }

    @Test
    void shouldSaveRole() {
        //given
        Role role = new Role();

        //when
        userService.saveRole(role);

        //then
        verify(roleRepository).save(role);

    }


    @Test
    void shouldAddRoleToUser() {
        //given
        User user = new User();
        user.setUsername("test_user");
        user.setPassword("password");
        user.setEmail("test_email");
        user.setName("test_name");
        user.setSurname("test_surname");
        Role role = new Role();
        role.setName("test_role");
        log.info(String.valueOf(user));
        log.info(String.valueOf(role));
        when(userRepository.findByUsername(user.getUsername())).thenReturn(user);
        when(roleRepository.findByName(role.getName())).thenReturn(role);

        //when
        userService.addRoleToUser(user.getUsername(), role.getName());
        boolean expected = user.getRoles().contains(role);

        //then
        assertThat(expected).isTrue();

    }


    @Test
    void shouldCheckIfUserExists() {
        //given
        User user = new User();
        user.setUsername("test_user");
        user.setPassword("password");
        user.setEmail("test_email");
        user.setName("test_name");
        user.setSurname("test_surname");
        lenient().when(userRepository.findUserByEmail(user.getEmail())).thenReturn(user);
        when(userRepository.findByUsername(user.getUsername())).thenReturn(user);

        //when
        Boolean expected = userService.doesUserExists(user.getUsername(), user.getEmail());

        //then
        assertThat(expected).isTrue();

    }
}