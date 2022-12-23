package wrobel.beJacked.advice;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class CustomApiError {

    private String timestamp;
    private HttpStatus status;
    private String message;

    private CustomApiError() {
        DateTimeFormatter dft = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm:ss");

        this.timestamp = dft.format(LocalDateTime.now());
    }

    public CustomApiError(HttpStatus status, String message) {
        this();
        this.status = status;
        this.message = message;
    }
}
