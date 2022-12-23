package wrobel.beJacked.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


/**
 * This Configuration class contains secret value from application.properties
 * this secret value is used to create Algorithm, which is used to sign acces and refresh token
 *
 * This class creates access and refresh token based on passed request, user(userDetails) object and expire time( in miliseconds)
 *
 */
@Configuration
public class CustomJWTConfig {
    private static String secret;




    @Value("${custom.jwt.secret}")
    public void setSecret(String secret) {
        CustomJWTConfig.secret = secret;
    }

    public static String getSecret() {
        return secret;
    }

    public static String createAccessToken(HttpServletRequest request, String subject, List<?> claims, int expireTime) {
        return JWT.create()
                .withSubject(subject)
                .withExpiresAt(new Date(System.currentTimeMillis() + expireTime))
                .withIssuer(request.getRequestURI())
//                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .withClaim("roles", claims)
                .sign(Algorithm.HMAC256(secret.getBytes(StandardCharsets.UTF_8)));
    }

    public static String createRefreshToken(HttpServletRequest request, String subject, int expireTime) {
        return JWT.create()
                .withSubject(subject)
                .withExpiresAt(new Date(System.currentTimeMillis() + expireTime))
                .withIssuer(request.getRequestURI())
                .sign(Algorithm.HMAC256(secret.getBytes(StandardCharsets.UTF_8)));
    }


}
