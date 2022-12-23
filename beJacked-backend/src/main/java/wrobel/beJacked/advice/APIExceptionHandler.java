package wrobel.beJacked.advice;


import org.apache.coyote.Response;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import wrobel.beJacked.exception.UserNotAuthorizedException;

/**
 * Class responsible for handling thrown custom exceptions from code
 */
@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class APIExceptionHandler extends ResponseEntityExceptionHandler {

//    private ResponseEntity<Object> buildError(CustomApiError error) {
//        return new ResponseEntity<>(error, error.getStatus());
//    }

    @ExceptionHandler(UserNotAuthorizedException.class)
    protected final ResponseEntity<?> handleUserNotAuthorizedException(UserNotAuthorizedException ex) {
        if(ex.getMessage() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authorized");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new CustomApiError(HttpStatus.UNAUTHORIZED, ex.getMessage()));
    }

}
