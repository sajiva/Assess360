package hello.repositories.exceptions;

public class ParticipantNotFoundException extends Exception {

    public ParticipantNotFoundException(Integer participantID) {

        //Displays when a participant cannot be found

        super("Could not find participant of ID: " + participantID);
    }
}
