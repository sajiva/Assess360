package hello.models;

/**
 * Created by Hector on 4/2/2017.
 */
public class LoginResponse {

    /* Handles response to user when attempting to log in */

    private boolean success;
    private String message;
    private String sessionKey;

    public LoginResponse(boolean _success,String _message, String _sessionKey){
        this.success=_success;
        this.message=_message;
        this.sessionKey=_sessionKey;
    }
    public static LoginResponse failed(String message){
        return new LoginResponse(false, message,null);
    }
    public static LoginResponse success(String session){
        return new LoginResponse(true, "Successful Login",session);
    }
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSessionKey() {
        return sessionKey;
    }

    public void setSessionKey(String sessionKey) {
        this.sessionKey = sessionKey;
    }
}
