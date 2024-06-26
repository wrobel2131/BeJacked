package wrobel.beJacked.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StreamUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import wrobel.beJacked.advice.CustomApiError;
import wrobel.beJacked.exception.UserNotAuthorizedException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpHeaders.WARNING;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;


/**
 * Filter is passed in SecurityConfig,
 * Class is responsible for checking the request, if the request is for login, register or new access token,
 * request is passed to next filter
 *
 * Filter checks for Authorization header in requests, gets Bearer token, decodes it and verifies, if token is valid
 * If so, user data and claims(roles in this app) are being passed to Spring Security Context
 * Spring Security uses Security Context to check, if user from token is authorized to specific resources
 */
@Slf4j
public class CustomAuthorizationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //first we are checking, if this is not the login path, we dont need to authorize user to login

        if(request.getServletPath().equals("/api/v1/auth/login") || request.getServletPath().equals("/api/v1/auth/register") || request.getServletPath().equals("/api/v1/auth/token")) {
            filterChain.doFilter(request, response);
        } else {

            String authorizationHeader = request.getHeader(AUTHORIZATION);
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                try {
                    String token = authorizationHeader.substring("Bearer ".length()); //removing Bearer, gets only header
                    Algorithm algorithm = Algorithm.HMAC256(CustomJWTConfig.getSecret().getBytes(StandardCharsets.UTF_8));
                    JWTVerifier verifier = JWT.require(algorithm).build();
                    DecodedJWT decodedJWT = verifier.verify(token);
                    String username = decodedJWT.getSubject();
                    String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
                    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                    stream(roles).forEach(role -> {
                        authorities.add(new SimpleGrantedAuthority(role));
                    });
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);


                    filterChain.doFilter(request, response);
                }catch(Exception exception) {
                    log.info(exception.getMessage());
                    response.setHeader(WARNING, exception.getMessage());
                    response.setStatus(HttpStatus.FORBIDDEN.value());

//                    CustomApiError error = new CustomApiError(HttpStatus.FORBIDDEN, exception.getMessage());
//                    log.info(String.valueOf(error));
                    response.setContentType(APPLICATION_JSON_VALUE);
                    new ObjectMapper().writeValue(response.getOutputStream(), exception.getMessage());
                    log.info(String.valueOf(response.getStatus()));
                }
            } else {
                log.info("no i cnuj");
//                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                log.info(String.valueOf(response.getStatus()));
                filterChain.doFilter(request, response);

//                log.info(String.valueOf(response.getStatus()));

            }
        }

    }
}
