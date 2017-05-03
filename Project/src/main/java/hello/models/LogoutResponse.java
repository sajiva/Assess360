package hello.models;

/**
 * Created by Hector on 4/2/2017.
 */
public class LogoutResponse {

    /* Handles response to user when attempting to log in */

    private boolean success;
    private String message;
    private String sessionKey;

    public LogoutResponse(boolean _success,String _message){
        this.success=_success;
        this.message=_message;
    }
    public static LogoutResponse failed(String message){
        return new LogoutResponse(false, message);
    }
    public static LogoutResponse success(){
        return new LogoutResponse(true, "Successful Logout");
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

}
