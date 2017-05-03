package hello.models;

import javax.persistence.*;
import java.util.Set;

@Entity
public class TargetGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "group_participant", joinColumns = @JoinColumn(name = "group_id"), inverseJoinColumns = @JoinColumn(name = "participant_id"))
    private Set<Participant> participantSet;

    @ManyToMany(cascade=CascadeType.ALL)
    @JoinTable(name="users_targetgroups", joinColumns=@JoinColumn(name="group_id"), inverseJoinColumns=@JoinColumn(name="user_id"))
    private Set<User> usersSet;

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<User> getUsersSet() {
        return usersSet;
    }

    public void setUsersSet(Set<User> usersSet) {
        this.usersSet = usersSet;
    }

    public Set<Participant> getParticipantSet() {
        return participantSet;
    }

    public void setParticipantSet(Set<Participant> participantSet) {
        this.participantSet = participantSet;
    }

}
