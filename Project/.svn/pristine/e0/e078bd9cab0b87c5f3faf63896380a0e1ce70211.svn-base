package hello.controllers;

import hello.models.Participant;
import hello.repositories.ParticipantRepository;
import hello.repositories.exceptions.ParticipantNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ParticipantController {

    private ParticipantRepository participantRepository;

    @Autowired
    public ParticipantController(ParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
    }

    /**
     localhost:8080/rest/participants
     Gets all participants
     */
    @RequestMapping(value = "/rest/participants", method= RequestMethod.GET)
    public ArrayList<Participant> getParticipants() {
        ArrayList<Participant> participants = new ArrayList<>();

        for (Participant participant : participantRepository.findAll()) {
            participants.add(participant);
        }

        return participants;
    }

    /**
     localhost:8080/rest/participants/{id}
     Gets a participant
     */
    @RequestMapping(value = "/rest/participants/{id}", method = RequestMethod.GET)
    public ResponseEntity<Participant> getParticipant(@PathVariable("id") int id) {
        Participant participant = participantRepository.findOne(id);
        HttpStatus httpStatus = (participant == null) ? HttpStatus.NOT_FOUND : HttpStatus.OK;

        return new ResponseEntity<>(participant, httpStatus);
    }

    /**
     * Adds a participant
     * @param participant
     * @return
     */
    @RequestMapping(value = "/rest/participant", method = RequestMethod.POST)
    public ResponseEntity<Participant> addParticipant(@RequestBody Participant participant) {
        Participant newParticipant = participantRepository.save(participant);

        return new ResponseEntity<>(newParticipant, HttpStatus.CREATED);
    }

    /**
     * Adds a participants TODo GET Tested
     * @param participants
     * @return the Participants added
     */
    @RequestMapping(value = "/rest/participants", method = RequestMethod.POST)
    public ResponseEntity<List<Participant>> addParticipants(@RequestBody List<Participant> participants) {
        participantRepository.save(participants);

        return new ResponseEntity<>(participants, HttpStatus.CREATED);
    }

    /**
     * Updates a participant
     * @param id
     * @return
     */
    @RequestMapping(value = "/rest/participants/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Participant> updateParticipant(@PathVariable("id") int id, @RequestBody Participant participant) throws Exception {
        Participant participantToUpdate = participantRepository.findOne(id);
        if (participantToUpdate == null)
            throw new ParticipantNotFoundException(id);

        participantToUpdate.setName(participant.getName());
        participantToUpdate.setEmail(participant.getEmail());
        participantToUpdate.setPhone(participant.getPhone());
        participantRepository.save(participantToUpdate);

        return new ResponseEntity<>(participantToUpdate, HttpStatus.OK);
    }

    /**
     * Deletes a participant
     * @param id
     * @return
     */
    @RequestMapping(value = "rest/participants/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteParticipant(@PathVariable("id") int id) throws Exception {
        Participant participant = participantRepository.findOne(id);

        if (participant == null)
            throw new ParticipantNotFoundException(id);

        participantRepository.delete(participant);

        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }

}
