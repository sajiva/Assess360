package hello.models;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 * Created by Hector on 4/2/2017.
 */
public class LoginRequest {

    private String username;
    private String password;


    public LoginRequest(){

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
