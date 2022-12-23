package wrobel.beJacked.config;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JWTUtils {
    private String access_token;
    private String token_type;
    private String expires_in;
    private String refresh_token;

//    public JWTUtils(String access_token, String token_type, String expires_in) {
//        this.access_token = access_token;
//        this.token_type = token_type;
//        this.expires_in = expires_in;
//        this.refresh_token = null;
//    }

    public JWTUtils(String access_token, String token_type, String expires_in, String refresh_token) {
        this.access_token = access_token;
        this.token_type = token_type;
        this.expires_in = expires_in;
        this.refresh_token = refresh_token;
    }
}
