package wrobel.beJacked.config;


import lombok.Data;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class which enables to put secret to application.properties as custom property
 * @EnableConfigurationProperties(CustomJWTProperties.class) is required in BeJackedApplication class
 */

@ConfigurationProperties(prefix = "custom.jwt")
@Configuration
@Data
public class CustomJWTProperties {
    private String secret;
}
