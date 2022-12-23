package wrobel.beJacked.DTO;

import lombok.Data;

@Data
public class UserRegisterDTO {
    private String username;
    private String email;
    private String password;
    private String confirmPassword;
    private String name;
    private String surname;
    private String role;
}
