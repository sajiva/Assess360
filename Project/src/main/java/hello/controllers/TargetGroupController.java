package hello.controllers;

import hello.helpers.PatchClasses;
import hello.models.Assessment;
import hello.models.Participant;
import hello.models.TargetGroup;
import hello.models.User;
import hello.repositories.AssessmentRepository;
import hello.repositories.ParticipantRepository;
import hello.repositories.TargetGroupRepository;
import hello.repositories.exceptions.ParticipantNotFoundException;
import hello.repositories.exceptions.TargetGroupNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class TargetGroupController {

    private TargetGroupRepository targetGroupRepository;
    private ParticipantRepository participantRepository;
    private AssessmentRepository assessmentRepository;

    @Autowired
    public TargetGroupController(TargetGroupRepository targetGroupRepository, ParticipantRepository participantRepository, AssessmentRepository assessmentRepository) {
        this.targetGroupRepository = targetGroupRepository;
        this.participantRepository = participantRepository;
        this.assessmentRepository = assessmentRepository;
    }


    /**
     * Gets all the Target Groups
     * @return The Target Groups
     * *NOTE* Will only deal with Target Groups with the Signed in User
     */
    @RequestMapping(value = "/rest/targetGroups", method= RequestMethod.GET)
    public ArrayList<TargetGroup> getTargetGroups() throws Exception
    {
        ArrayList<TargetGroup> targetGroups = new ArrayList<>();

        for (TargetGroup targetGroup : targetGroupRepository.findAll(AuthenticationController.GetUser()))
        {
            targetGroups.add(targetGroup);
        }

        return targetGroups;
    }

    /**
     * Gets the info for one Target Group
     * @param id The Id of the Target Group
     * @return The Target Group
     * *NOTE* Will only deal with Target Groups with the Signed in User
     */
    @RequestMapping(value = "/rest/targetGroups/{id}", method = RequestMethod.GET)
    public ResponseEntity<TargetGroup> getTargetGroup(@PathVariable("id") int id) {
        TargetGroup targetGroup = targetGroupRepository.findOne(id);
        HttpStatus httpStatus = (targetGroup == null) ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return new ResponseEntity<>(targetGroup, httpStatus);
    }

    /**
     * Adds a target group
     * @param targetGroup The Info for the Target Group
     * @return The Target Group Created
     */
    @RequestMapping(value = "/rest/targetGroups", method = RequestMethod.POST)
    public ResponseEntity<TargetGroup> addTargetGroup(HttpSession session,@RequestBody TargetGroup targetGroup) throws Exception{
        TargetGroup newTargetGroup = targetGroupRepository.save(targetGroup);
        newTargetGroup.setUsersSet(((new HashSet<User>() {})));

        /*******************************************************************/
        /* Add the User to the Target Group                                */
        /*******************************************************************/
        try
        {
            newTargetGroup=this.addUserToTargetGroup(newTargetGroup,AuthenticationController.GetUser(session));
        }
        catch (Exception e)
        {
            targetGroupRepository.delete(newTargetGroup); //Roll Back Change
            throw e;
        }

        /*******************************************************************/
        return new ResponseEntity<>(newTargetGroup, HttpStatus.CREATED);
    }

    /**
     * Updates a target group
     * @param id the Id of the Target Group
     * @param targetGroup The Target Group Info updating
     * @return The Target Group
     */
    @RequestMapping(value = "/rest/targetGroups/{id}", method = RequestMethod.PUT)
    public ResponseEntity<TargetGroup> updateTargetGroup(@PathVariable("id") int id, @RequestBody TargetGroup targetGroup) throws Exception {
        TargetGroup targetGroupToUpdate = targetGroupRepository.findOne(id);
        if (targetGroupToUpdate == null)
            throw new TargetGroupNotFoundException(id);

        PatchClasses.PerformAPatch(targetGroupToUpdate,targetGroup);
        targetGroupRepository.save(targetGroupToUpdate);

        return new ResponseEntity<>(targetGroupToUpdate, HttpStatus.OK);
    }

    /**
     * Deletes a target group
     * @param id the Id of the Target Group
     * @return The Target Group
     */
    @RequestMapping(value = "rest/targetGroups/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteTargetGroup(@PathVariable("id") int id) throws Exception {
        TargetGroup targetGroup = targetGroupRepository.findOne(id);

        if (targetGroup == null)
            throw new TargetGroupNotFoundException(id);

        targetGroupRepository.delete(targetGroup);

        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }

    /**
     * Adds a list of participants to target group
     * @param id The Id of the Target Group
     * @param participants The Participants
     * @return The Target Group
     */
    @RequestMapping(value = "rest/targetGroups/{id}/participantList", method = RequestMethod.POST)
    public ResponseEntity<TargetGroup> addNewParticipantsToTargetGroup(@PathVariable("id") int id, @RequestBody List<Participant> participants) throws Exception {
        TargetGroup targetGroup = targetGroupRepository.findOne(id);

        if (targetGroup == null)
            throw new TargetGroupNotFoundException(id);

        targetGroup = addParticipantsToTargetGroup(targetGroup, participants);
        return new ResponseEntity<>(targetGroup, HttpStatus.OK);
    }
    /**
     * Adds new participant to target group
     * @param id The Id of the Target Group
     * @param participant The Participant
     * @return The Target Group
     */
    @RequestMapping(value = "rest/targetGroups/{id}/participants", method = RequestMethod.POST)
    public ResponseEntity<TargetGroup> addNewParticipantToTargetGroup(@PathVariable("id") int id, @RequestBody Participant participant) throws Exception {
        TargetGroup targetGroup = targetGroupRepository.findOne(id);

        if (targetGroup == null)
            throw new TargetGroupNotFoundException(id);

        targetGroup = addParticipantToTargetGroup(targetGroup, participant);
        return new ResponseEntity<>(targetGroup, HttpStatus.OK);
    }

    /**
     * Adds an existing participant to target group
     * @param targetGroupId The Id of the Target Group
     * @param participantId The Id of the Participant
     * @return The Target Group
     */
    @RequestMapping(value = "rest/targetGroups/{id}/participants/{participantId}", method = RequestMethod.POST)
    public ResponseEntity<TargetGroup> addExistingParticipantToTargetGroup(@PathVariable("id") int targetGroupId, @PathVariable("participantId") int participantId) throws Exception {
        TargetGroup targetGroup = targetGroupRepository.findOne(targetGroupId);

        if (targetGroup == null)
            throw new TargetGroupNotFoundException(targetGroupId);

        Participant participant = participantRepository.findOne(participantId);

        if (participant == null)
            throw new ParticipantNotFoundException(participantId);

        targetGroup = addParticipantToTargetGroup(targetGroup, participant);
        return new ResponseEntity<>(targetGroup, HttpStatus.OK);
    }

    /**
     * Removes a participant from target group
     * @param targetGroupId The Id of the Target Group
     * @param participantId The Id of the Participant
     * @return The Target Group
     */
    @RequestMapping(value = "rest/targetGroups/{id}/participants/{participantId}", method = RequestMethod.PUT)
    public ResponseEntity<TargetGroup> removeParticipantFromTargetGroup(@PathVariable("id") int targetGroupId, @PathVariable("participantId") int participantId) throws Exception {
        TargetGroup targetGroup = targetGroupRepository.findOne(targetGroupId);

        if (targetGroup == null)
            throw new TargetGroupNotFoundException(targetGroupId);

        Participant participant = participantRepository.findOne(participantId);

        if (participant == null)
            throw new ParticipantNotFoundException(participantId);

        Set<Participant> participantSet = targetGroup.getParticipantSet();
        participantSet.remove(participant);
        targetGroup.setParticipantSet(participantSet);
        targetGroup = targetGroupRepository.save(targetGroup);

        return new ResponseEntity<>(targetGroup, HttpStatus.OK);
    }

    /**
     * Gets all assessments for a target group
     * @param id the Id of the Target Group
     * @return List of Assessments
     */
    @RequestMapping(value = "rest/targetGroups/{id}/assessments", method = RequestMethod.GET)
    public List<Assessment> getAssessmentsForTargetGroup(@PathVariable("id") int id) throws Exception {
        TargetGroup targetGroup = targetGroupRepository.findOne(id);

        if (targetGroup == null)
            throw new TargetGroupNotFoundException(id);

        List<Assessment> assessments = assessmentRepository.findByTargetGroup(targetGroup);

        return assessments;
    }


    //Adds one participant to the target group
    private TargetGroup addParticipantToTargetGroup(TargetGroup targetGroup, Participant participant) {
        Set<Participant> participantSet = targetGroup.getParticipantSet();
        participantSet.add(participant);
        targetGroup.setParticipantSet(participantSet);

        return targetGroupRepository.save(targetGroup);
    }
    //Adds multiple participants to the target group
    private TargetGroup addParticipantsToTargetGroup(TargetGroup targetGroup, List<Participant> participants) {
        Set<Participant> participantSet = targetGroup.getParticipantSet();
        for(Participant participant : participants){
            participantSet.add(participant);
        }
        targetGroup.setParticipantSet(participantSet);

        return targetGroupRepository.save(targetGroup);
    }

    //Adds a user to the target group
    private TargetGroup addUserToTargetGroup(TargetGroup targetGroup, User user)
    {
        Set<User> userSet = targetGroup.getUsersSet();
        userSet.add(user);
        targetGroup.setUsersSet(userSet);
        return this.targetGroupRepository.save(targetGroup);
    }
}
