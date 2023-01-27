package wrobel.beJacked.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import wrobel.beJacked.DTO.UserRegisterDTO;
import wrobel.beJacked.model.Role;
import wrobel.beJacked.model.User;
import wrobel.beJacked.repository.RoleRepository;
import wrobel.beJacked.service.implementation.AuthServiceImpl;
import wrobel.beJacked.service.implementation.ProgramServiceImpl;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@Slf4j
class AuthServiceUnitTest {

    @Mock
    private RoleRepository roleRepository;

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthServiceImpl(roleRepository);
    }

    @Test
    void shouldCheckIfPasswordsAreEqual() {
        //given
        String password1 = "password";
        String password2 = "password";

        //when
        Boolean expected = authService.checkPasswords(password1, password2);

        //then
        assertThat(expected).isTrue();
    }
    @Test
    void shouldCheckIfPasswordsAreNotEqual() {
        //given
        String password1 = "password";
        String password2 = "password1";

        //when
        Boolean expected = authService.checkPasswords(password1, password2);

        //then
        assertThat(expected).isFalse();
    }

    @Test
    void convertDTOtoUser() {
        //given
        UserRegisterDTO form = new UserRegisterDTO();
        String roleName = "test-role";
        form.setRole(roleName);
        form.setPassword("password");
        form.setConfirmPassword("password");
        Role role = new Role();
        when(roleRepository.findByName(form.getRole())).thenReturn(role);

        //when
        User expected = authService.convertDTOtoUser(form);

        //then
        assertThat(expected.getClass().equals(User.class) && expected.getRoles().contains(role));

    }
}