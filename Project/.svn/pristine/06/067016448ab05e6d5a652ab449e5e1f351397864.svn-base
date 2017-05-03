package hello.models;

/**
 * Created by Hector on 1/28/2017.
 */

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;


@Entity
public class UserSession {


    @Id
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(strategy= GenerationType.AUTO, generator = "uuid2")
    @Column(columnDefinition = "CHAR(40)")
    private String SessionID;

    @OneToOne
    private User LinkedUser;

    public UserSession(){}

    public UserSession(User user){
        this.LinkedUser = user;
    }

    public String getSessionID() {
        return SessionID;
    }

    public User getLinkedUser() {
        return LinkedUser;
    }

    public static UserSession generateSession(User user){
        UserSession session=new UserSession();
        session.setLinkedUser(user);
        return session;
    }
    public void setLinkedUser(User LinkedUser) {
        this.LinkedUser = LinkedUser;
    }
}