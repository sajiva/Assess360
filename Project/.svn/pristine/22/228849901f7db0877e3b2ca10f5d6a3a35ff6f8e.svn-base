package hello.models;

import javax.persistence.*;
import java.sql.Time;
import java.util.*;

@Entity
@Table(name = "assessment")
public class Assessment {

    /* Initializes assessment properties */

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "name", nullable = true)
    private String name;

    @Column(name = "subtitle", nullable = true)
    private String subtitle;

    @Column(name = "allowed_time_sec", nullable = true)
    private Integer allowed_time_sec;

    @Column(name = "istimed", nullable = true)
    private boolean istimed;

    @Column(name = "expirationDate")
    private Date expirationDate;

    @Column(name = "createdAt")
    private Date createdAt;

    @ManyToMany(cascade=CascadeType.ALL)
    @JoinTable(name="assessment_question", joinColumns=@JoinColumn(name="assessment_id"),  inverseJoinColumns=@JoinColumn(name="question_id"))
    private Set<Question> questionSet;

    @ManyToMany(cascade=CascadeType.ALL)
    @JoinTable(name="users_assessments", joinColumns=@JoinColumn(name="assessment_id"), inverseJoinColumns=@JoinColumn(name="user_id"))
    private Set<User> usersSet;

    @ManyToOne
    private TargetGroup targetGroup;

    public Assessment(){
        this.setAllowed_time_sec(100);
        this.setCreatedAt(new Date());
        this.setExpirationDate(new Date());
    }
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public Set<Question> getQuestionSet() {
        return questionSet;
    }

    public void setQuestionSet(Set<Question> questionSet) {
        this.questionSet = questionSet;
    }

    public Integer getAllowed_time_sec() {
        return allowed_time_sec;
    }

    public void setAllowed_time_sec(Integer allowed_time_sec) {
        this.allowed_time_sec = allowed_time_sec;
    }

    public boolean isIstimed() {
        return istimed;
    }

    public void setIstimed(boolean istimed) {
        this.istimed = istimed;
    }

    public Date getExpirationDate()
    {
        if(expirationDate==null){
            return new Date();
        }
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {

        if(expirationDate==null){
            this.setExpirationDate(new Date());
        }
        this.expirationDate = expirationDate;
    }

    public Set<User> getUsersSet() { return usersSet; }

    public void setUsersSet(Set<User> usersSet) {
        this.usersSet = usersSet;
    }

    public Date getCreatedAt() {
        if(createdAt==null){
            return new Date();
        }
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        if(createdAt==null){
            this.setCreatedAt(new Date());
        }
        this.createdAt = createdAt;
    }

    public TargetGroup getTargetGroup() {
        return targetGroup;
    }

    public void setTargetGroup(TargetGroup targetGroup) {
        this.targetGroup = targetGroup;
    }
}
