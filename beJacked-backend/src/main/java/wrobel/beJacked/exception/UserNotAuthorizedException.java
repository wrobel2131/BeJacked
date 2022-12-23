package wrobel.beJacked.exception;


public class UserNotAuthorizedException extends RuntimeException{
    public UserNotAuthorizedException(String exception){super(exception);}

    public UserNotAuthorizedException(){};
}
