package hello.models;

import javax.persistence.*;
import java.util.Set;


@Entity // This tells Hibernate to make a table out of this class
public class Question {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private String type;

    private String status;

    private String content;

    private String hint;

    private boolean hasHint;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public String getStatus()
    {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        this.hint = hint;
    }

    public boolean isHasHint() {
        return hasHint;
    }

    public void setHasHint(boolean hasHint) {
        this.hasHint = hasHint;
    }
}