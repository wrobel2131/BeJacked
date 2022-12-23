package wrobel.beJacked.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import wrobel.beJacked.DTO.RoleToUserDTO;
import wrobel.beJacked.model.Role;
import wrobel.beJacked.model.User;
import wrobel.beJacked.service.UserService;

import javax.annotation.security.RolesAllowed;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/users")
public class UserController {

    private final UserService userService;


    @RolesAllowed("ROLE_USER")
    @GetMapping(path = "/{username}")
    User getUser(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @RolesAllowed("ROLE_ADMIN")
    @GetMapping()
    List<User> getUsers() {
        return userService.getUsers();
    }

    @RolesAllowed("ROLE_TRAINER")
    @GetMapping(path = "/email/{email}")
    User getUserByEmail(@PathVariable String email) {return userService.getUserByEmail(email);}

    //Trzeba bedzie w tych request body dac USERDTO a obiekty ktore maja stycznosc z baza danych dac USERDAO

    @PostMapping()
    User addUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    //To prawdopodobnie w osobnych kontrolerze dac
    //jezeli chodzi o logowanie oraz rejestracje, to chyba osobny kontroller, sprawdzic tez czy da sie zmienic api url z /login
    //na cos innego

    @PostMapping("/role/save")
    public Role addRole(@RequestBody Role role) {
        return userService.saveRole(role);
    }

    @PostMapping("/role/addToUser")
    public void addRoleToUser(@RequestBody RoleToUserDTO form) {
        userService.addRoleToUser(form.getUsername(), form.getRoleName());
    }



}
