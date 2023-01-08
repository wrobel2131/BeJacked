package wrobel.beJacked.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import wrobel.beJacked.advice.CustomApiError;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.WARNING;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * Filter responsible for checking login attempts
 * Filter gets username and plain password, encypts given password with Bcrypt method and checks, if is equal
 * to the password from database
 * If so, user is authenticated, filter returns response with access and refresh token
 */
@Slf4j
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        log.info("attempt done");
        String username, password;
        try {
            Map<String, String> requestMap = new ObjectMapper().readValue(request.getInputStream(), Map.class);
//            log.info(Arrays.toString(request.getInputStream().readAllBytes()));
            username = requestMap.get("username");
            password = requestMap.get("password");
        } catch (IOException e) {
            throw new AuthenticationServiceException("tutaj");
        }
//        String username = request.getParameter("username");
//        String password = request.getParameter("password");
//        Enumeration<String> headerNames = request.getHeaderNames();
//
//        if (headerNames != null) {
//            while (headerNames.hasMoreElements()) {
//                log.info("Header: " + request.getHeader(headerNames.nextElement()));
//            }
//        }
        log.info(username);
        log.info(password);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication auth) throws IOException, ServletException {
        log.info("success");

        User user = (User) auth.getPrincipal();
        //Signing access and refresh token, secret need to be get from properties for example

        int accessTokenExpireTime = 60*1000; //minuta
        int refreshTokenExpireTime = 30*60*1000; //30 min

        String accessToken = CustomJWTConfig.createAccessToken(request, user.getUsername(),user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()), accessTokenExpireTime);
        String refreshToken = CustomJWTConfig.createRefreshToken(request, user.getUsername(), refreshTokenExpireTime);

        JWTUtils jwt = new JWTUtils(accessToken, "Bearer", String.valueOf(accessTokenExpireTime), refreshToken, user.getUsername());
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), jwt);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        log.info("unsuccess");
        log.info(failed.getMessage());
        response.setHeader(WARNING, failed.getMessage());
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
//        CustomApiError error = new CustomApiError(HttpStatus.UNAUTHORIZED, failed.getMessage());
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), failed.getMessage());
    }
}
