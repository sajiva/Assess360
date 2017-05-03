package hello.controllers;

import hello.helpers.PatchClasses;
import hello.models.*;
import hello.repositories.AssessmentRepository;
import hello.repositories.QuestionRepository;
import hello.repositories.TargetGroupRepository;
import hello.repositories.UserRepository;
import hello.repositories.exceptions.AssessmentNotFoundException;
import hello.repositories.exceptions.QuestionNotFoundException;
import hello.repositories.exceptions.TargetGroupNotFoundException;
import hello.repositories.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.web.bind.annotation.*;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;


/**
localhost:8080/assessments
 */
@RestController
public class AssessmentController
{


    private static JavaMailSenderImpl StaticEmailSender;

    private AssessmentRepository assessmentRepository;
    private QuestionRepository questionRepository;
    private UserRepository userRepository;
    private TargetGroupRepository targetGroupRepository;

    @Autowired
    public AssessmentController(JavaMailSenderImpl emailSender, AssessmentRepository assessmentRepository, QuestionRepository questionRepository, UserRepository userRepository, TargetGroupRepository targetGroupRepository){
        this.assessmentRepository = assessmentRepository;
        this.questionRepository = questionRepository;
        this.userRepository=userRepository;
        AssessmentController.StaticEmailSender=emailSender;
        this.targetGroupRepository = targetGroupRepository;
    }

    private static void sendEmail(String email) throws Exception{
        MimeMessagePreparator  crunchifyMsg = new MimeMessagePreparator(){
            public void prepare(MimeMessage mimeMessage) throws Exception {

                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true);
                helper.setTo(new InternetAddress(email));


                helper.setSubject("SHRPAS Assessment");
                helper.setFrom( new InternetAddress("updates@shrpas.com","SHRPAS Updates"));
                helper.setText("<h1>Hello, this is a email from SHRPAS</h1>"+
                                    "<div style='text-align:center'><a href='http://team3-shrpas.herokuapp.com/' style='" +
                                "    border-radius: 10px;" +
                                "    display:inline-block;" +
                                "    color: #ffffff;" +
                                "    padding:50px;"+
                                "    text-decoration: none;" +
                                "    font-style: initial;" +
                                "    font-size: 5vw;" +
                                "    box-shadow: 0px 1px 1px rgba(0,0,0,.6), inset 0px 1px rgba(255,255,255,.6);" +
                                "    background: #009688;'>" +
                                "<div style='display:inline-block;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)'>Click Here</div>" +
                                "</a></div>"
                               ,true);
            }
        };

        StaticEmailSender.send(crunchifyMsg);

    }

    /**
     *
     * @param assessmentID Assessment ID
     * @return
     */
    @RequestMapping(value = "/rest/assessments/{id}/", method=RequestMethod.GET)
    public ResponseEntity<Assessment> getAssessment(@PathVariable("id") int assessmentID) {
        Assessment assessment = this.assessmentRepository.findOne(assessmentID);
        if(assessment != null){
            return new ResponseEntity<>(assessment, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(assessment, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Adds an assessment
     * @param assessment The Body of the Assessment
     * @return The Assessment
     */
    @RequestMapping(value = "/rest/assessments", method=RequestMethod.POST)
    public ResponseEntity<Assessment> addAssessment(HttpSession session,@RequestBody Assessment assessment) throws Exception
    {
        /*******************************************************************/
        /* Add the Assessment                                              */
        /*******************************************************************/
        Assessment newAssessment = assessmentRepository.save(assessment);
        newAssessment.setUsersSet(((new HashSet<User>() {})));

        /*******************************************************************/
        /* Adds the User to the assessment                                 */
        /*******************************************************************/
        try {
            this.addUserToAssessment(newAssessment, AuthenticationController.GetUser(session));
        }
        catch(Exception e){
            assessmentRepository.delete(newAssessment); // Roll Back
            throw e;
        }

        /*******************************************************************/
        return new ResponseEntity<Assessment>(newAssessment, HttpStatus.OK);
    }

    /**
     * Updates an assessment
     * @param assessmentID The Id of the Assessment to be used
     * @return The Assessment
     */
    @RequestMapping(value = "/rest/assessments/{id}", method=RequestMethod.PATCH)
    public ResponseEntity<Assessment> updateAssessment(@PathVariable("id") int assessmentID, @RequestBody Assessment assessment) throws Exception {
        Assessment assessmentToBeUpdated = assessmentRepository.findOne(assessmentID);

        /*******************************************************************/
        if(assessmentToBeUpdated == null)
        {
            throw new AssessmentNotFoundException(assessmentID);
        }

        /*******************************************************************/
        PatchClasses.PerformAPatch(assessmentToBeUpdated, assessment);
        assessmentRepository.save(assessmentToBeUpdated);
        return new ResponseEntity<Assessment>(assessmentToBeUpdated, HttpStatus.OK);
    }

    /**
     * Adds a question to an assessment
     * @param assessmentID The Id of the Assessment to be used
     * @param question The body of a question(Will be creating a new question)
     * @return The Assessment
     */
    @RequestMapping(value = "/rest/assessments/{id}/question", method=RequestMethod.POST)
    public ResponseEntity<Assessment> addQuestion(@PathVariable("id") int assessmentID, @RequestBody Question question) throws Exception
    {
        Assessment assessment = assessmentRepository.findOne(assessmentID);

        /*******************************************************************/
        if(assessment != null)
        {
            assessment = this.addQuestionToAssessment(assessment, question);
            return new ResponseEntity<Assessment>(assessment, HttpStatus.OK);
        }

        /*******************************************************************/
        else
        {
            throw new AssessmentNotFoundException(assessmentID);
        }
    }

    /**
     * Adds an existing question to an assessment
     * @param assessmentID The Id of the Assess to be used
     * @param questionId The id of the Question to be used
     * @return The Assessment
     */
    @RequestMapping(value = "/rest/assessments/{id}/question/{questionId}", method=RequestMethod.POST)
    public ResponseEntity<Assessment> addExistingQuestion(@PathVariable("id") int assessmentID, @PathVariable("questionId") int questionId){
        Assessment assessment = assessmentRepository.findOne(assessmentID);

        /*******************************************************************/
        /* We have found the assessment                                    */
        /*******************************************************************/
        if(assessment != null)
        {
            Question question = questionRepository.findOne(questionId);

            /***************************************************************/
            if(question != null)
            {
                assessment = this.addQuestionToAssessment(assessment, question);
                return new ResponseEntity<Assessment>(assessment, HttpStatus.OK);
            }
            else
            {
                throw new QuestionNotFoundException(questionId);
            }
        }
        else
        {
            throw new AssessmentNotFoundException(assessmentID);
        }
    }

    /**
     * Adds a target group to an assessment
     * @param assessmentID The Id of the Assessment to be used
     * @param targetGroupId The id of the TargetGroup to be used
     * @return The Assessment
     */
    @RequestMapping(value = "/rest/assessments/{id}/targetGroup/{targetGroupId}", method=RequestMethod.POST)
    public ResponseEntity<Assessment> addTargetGroup(@PathVariable("id") int assessmentID, @PathVariable("targetGroupId") int targetGroupId) throws TargetGroupNotFoundException {
        Assessment assessment = assessmentRepository.findOne(assessmentID);

        if(assessment != null) {
            TargetGroup targetGroup = targetGroupRepository.findOne(targetGroupId);

            if(targetGroup != null) {
                assessment.setTargetGroup(targetGroup);
                assessment = assessmentRepository.save(assessment);
                return new ResponseEntity<>(assessment, HttpStatus.OK);
            }
            else {
                throw new TargetGroupNotFoundException(targetGroupId);
            }
        } else {
            throw new AssessmentNotFoundException(assessmentID);
        }
    }

    /**
     * Adds a user to an assessment
     * @param assessmentID Assessment ID
     * @param user User that is being added(Must exist)
     * @return ResponseEntity<Assessment>
     */
    @RequestMapping(value = "/rest/assessments/{id}/users", method=RequestMethod.POST)
    public ResponseEntity<Assessment> addUser(@PathVariable("id") int assessmentID, @RequestBody User user) throws Exception {
        Assessment assessment = assessmentRepository.findOne(assessmentID);
        if(assessment != null)
        {
            if(user.getUsername()==null)
            {
                throw new UserNotFoundException(null,"No User Name was found in the body");
            }

            /***************************************************************/
            User foundUser=userRepository.findOne(user.getUsername());

            /***************************************************************/
            if(foundUser==null)
            {
                throw new UserNotFoundException(user.getUsername());
            }

            /***************************************************************/
            assessment = this.addUserToAssessment(assessment, foundUser);
            return new ResponseEntity<Assessment>(assessment, HttpStatus.OK);
        }
        else
        {
            throw new AssessmentNotFoundException(assessmentID);
        }
    }

    /**
     * Gets all assessments
     * @param session Users Session(Were we will pick the user making the request)
     * @return ResponseEntity<Assessment>
     */
    @RequestMapping(value = "/rest/assessments", method=RequestMethod.GET)
    public ArrayList<Assessment> getAllAssessments(HttpSession session) throws Exception
    {
        /*******************************************************************/
        ArrayList<Assessment> assessments = new ArrayList<Assessment>();

        /*******************************************************************/
        for (Assessment assessment : assessmentRepository.findForUser(AuthenticationController.GetUser(session).getUsername()))
        {
            assessments.add(assessment);
        }

        /*******************************************************************/
        return assessments;


    }



    /**
     * Deletes an assessment
     * @param assessmentID Id of the assessment
     * @return A boolean indicating if it was trully deleted
     */
    @RequestMapping(value = "/rest/assessments/{id}/delete", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteAssessment(@PathVariable("id") int assessmentID)
    {
        Assessment assessment = assessmentRepository.findOne(assessmentID);

        /*******************************************************************/
        if (assessment != null)
        {
            assessmentRepository.delete(assessment);
            return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
        }

        /*******************************************************************/
        else
        {
            throw new AssessmentNotFoundException(assessmentID);
        }
    }

    /**
     * Deletes an assessment
     * @param assessmentID Id of the assessment
     * @return A boolean indicating if it was trully deleted
     */
    @RequestMapping(value = "/rest/assessments/{id}/send-assessment", method = RequestMethod.POST)
    public ResponseEntity<Boolean> sendAssessment(@PathVariable("id") int assessmentID,@RequestBody ArrayList<Participant> participants) throws Exception
    {
        for(Participant participant : participants)
        {
            if(participant.getEmail()==null){
                return new ResponseEntity<>(false,HttpStatus.OK);
            }
        }
        for(Participant participant : participants) {
            AssessmentController.sendEmail(participant.getEmail());
        }
        return new ResponseEntity<>(true,HttpStatus.OK);

    }


    /***********************************************************************/
    /* To Make Life Easier                                                 */
    /***********************************************************************/
    private Assessment addQuestionToAssessment(Assessment assessment, Question question)
    {
        Set<Question> questionSet = assessment.getQuestionSet();
        questionSet.add(question);
        assessment.setQuestionSet(questionSet);
        return this.assessmentRepository.save(assessment);
    }

    /***********************************************************************/
    private Assessment addUserToAssessment(Assessment assessment, User user)
    {
        Set<User> userSet = assessment.getUsersSet();
        userSet.add(user);
        assessment.setUsersSet(userSet);
        return this.assessmentRepository.save(assessment);
    }
}