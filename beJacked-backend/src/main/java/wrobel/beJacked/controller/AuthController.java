package wrobel.beJacked.controller;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import wrobel.beJacked.DTO.UserRegisterDTO;
import wrobel.beJacked.config.CustomJWTConfig;
import wrobel.beJacked.config.JWTUtils;
import wrobel.beJacked.exception.UserNotAuthorizedException;
import wrobel.beJacked.model.Role;
import wrobel.beJacked.model.User;
import wrobel.beJacked.service.AuthService;
import wrobel.beJacked.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpHeaders.WARNING;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = "/api/v1/auth")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;


    @PostMapping(path = "/register")
    public void register(@RequestBody UserRegisterDTO form) {
        if(!userService.doesUserExists(form.getUsername(), form.getEmail())) {
            User user = authService.convertDTOtoUser(form);
            userService.saveUser(user);
        } else {
            log.info("User already exists");

        }

    }

    @GetMapping("/token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refreshToken = authorizationHeader.substring("Bearer ".length()); //removing Bearer, gets only header
                Algorithm algorithm = Algorithm.HMAC256(CustomJWTConfig.getSecret().getBytes(StandardCharsets.UTF_8));
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refreshToken);
                String username = decodedJWT.getSubject();
                User user = userService.getUserByUsername(username);
                int accessTokenExpireTime = 60*1000;
                String accessToken = CustomJWTConfig.createAccessToken(request, user.getUsername(),user.getRoles().stream().map(Role::getName).collect(Collectors.toList()) ,accessTokenExpireTime);
                response.setContentType(APPLICATION_JSON_VALUE);
                JWTUtils jwt = new JWTUtils(accessToken, "Bearer", String.valueOf(accessTokenExpireTime), refreshToken, user.getUsername());
                new ObjectMapper().writeValue(response.getOutputStream(), jwt);
            }catch(Exception exception) {
                log.info(exception.getMessage());
                response.setHeader(WARNING, exception.getMessage());
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
//                CustomApiError error = new CustomApiError(HttpStatus.FORBIDDEN, exception.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), exception.getMessage());
            }

        } else {
            throw new UserNotAuthorizedException("Refresh Token is missing");
        }
    }
}
