package hello.controllers;

import hello.Application;
import hello.models.*;
import hello.repositories.*;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.web.context.WebApplicationContext;

import java.nio.charset.Charset;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@WebAppConfiguration
@DirtiesContext
public class AssessmentControllerTest {

    //This is a media type
    private final MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    private MockMvc mockMvc;

    private Assessment assessment;

    private Question question;

    private UserSession mockUserSession;
    private TargetGroup targetGroup;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserSessionRepository userSessionRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private TargetGroupRepository targetGroupRepository;
    
    @Autowired
    private WebApplicationContext webApplicationContext;



    @Before
    public void setUp() {
        mockMvc = webAppContextSetup(webApplicationContext).build();

        /*******************************************************************/
        Role thisRole=new Role();
        thisRole.setId(1);
        thisRole.setRole("user");
        roleRepository.save(thisRole);

        /*******************************************************************/
        User mockUser = new User();
        mockUser.setUsername("user1");
        mockUser.setPassword("user_pass");
        mockUser.setRole(thisRole);
        userRepository.save(mockUser);

        /*******************************************************************/
        mockUserSession=new UserSession();
        mockUserSession.setLinkedUser(mockUser);
        userSessionRepository.save(mockUserSession);

        /*******************************************************************/

        assessment = new Assessment();

    }

    @Test
    public void gettingAssessmentReturnsAnAssessment() throws Exception {
        assessment.setName("Software Engineer");
        assessment = assessmentRepository.save(assessment);
        mockMvc.perform(get("/rest/assessments/" + assessment.getId() + "/")
                .sessionAttr("SessionID",mockUserSession))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.id", is(assessment.getId())))
                .andExpect(jsonPath("$.name", is(assessment.getName())));
    }

    @Test
    public void getAllAssessmentsForUser() throws Exception {

        mockMvc.perform(get("/rest/assessments")
                    .sessionAttr("SessionID",mockUserSession))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    @Test
    public void addUserToAssessment() throws Exception {
        assessment.setName("Software Engineer");
        assessment = assessmentRepository.save(assessment);
        mockMvc.perform(post("/rest/assessments/"+assessment.getId()+"/users")
                .sessionAttr("SessionID",mockUserSession)
                .contentType(contentType)
                .content(createAddUserToAssessmentJson("user1")))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.id", is(assessment.getId())))
                .andExpect(jsonPath("$.usersSet", hasSize(1)))
                .andExpect(jsonPath("$.usersSet[0].username", is("user1")));
    }

    @Test
    public void addUserToNullAssessmentThrowsException() {
         try {
            mockMvc.perform(post("/rest/assessments/50/users")
                    .sessionAttr("SessionID",mockUserSession)
                    .contentType(contentType)
                    .content(createAddUserToAssessmentJson("user1")));
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }

    }


    @Test
    public void addUserWithNullUsernameToAssessmentThrowsException() {
        assessment = assessmentRepository.save(assessment);

        try {
            mockMvc.perform(post("/rest/assessments/" + assessment.getId() + "/users")
                    .sessionAttr("SessionID",mockUserSession)
                    .contentType(contentType)
                    .content("{}"));
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }

    }

    @Test
    public void addNonExistingUserToAssessmentThrowsException() {
        assessment = assessmentRepository.save(assessment);

        try {
            mockMvc.perform(post("/rest/assessments/" + assessment.getId() + "/users")
                    .sessionAttr("SessionID",mockUserSession)
                    .contentType(contentType)
                    .content(createAddUserToAssessmentJson("user100")));
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }

    }

    @Test
    public void gettingNonExistingAssessmentReturnsABadRequest() throws Exception {
        mockMvc.perform(get("/rest/assessments/" + 23 + "/")
                            .sessionAttr("SessionID",mockUserSession))
                        .andExpect(status().isBadRequest());
    }

    @Test
    public void addingAnAssessmentReturnsAnOkStatusAndAssessmentJSON() throws Exception {
        MockHttpServletRequestBuilder postBuilder = post("/rest/assessments")
                .sessionAttr("SessionID",mockUserSession)
                .contentType(contentType)
                .content(createAssessmentInJson("Software Engineer"))
                .header("TestingHeader", "Test Header");

        mockMvc.perform(postBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("Software Engineer")));
    }

    @Test
    public void addingAssessmentWhenNotLoggedInThrowsException() throws Exception {
        MockHttpServletRequestBuilder postBuilder = post("/rest/assessments")
                .contentType(contentType)
                .content(createAssessmentInJson("Software Engineer"))
                .header("TestingHeader", "Test Header");

        try {
            mockMvc.perform(postBuilder);
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }
    }

    @Test
    public void updatingAnAssessmentShouldUpdateAssessmentAndReturnOk() throws Exception {
        assessment.setName("Software Engineer");
        assessment = assessmentRepository.save(assessment);



        MockHttpServletRequestBuilder patchBuilder = patch("/rest/assessments/" + assessment.getId())
                .sessionAttr("SessionID",mockUserSession)
                .contentType(contentType)
                .content(createAssessmentInJson("Software Developer"))
                .header("Testing Header", "Test Header");

        mockMvc.perform(patchBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.id", is(assessment.getId())))
                .andExpect(jsonPath("$.name", is("Software Developer")));
    }

    @Test
    public void nullAssessmentShouldThrowException(){
        MockHttpServletRequestBuilder patchBuilder = patch("/rest/assessments/" + 23)
                .sessionAttr("SessionID",mockUserSession)
                .contentType(contentType)
                .content(createAssessmentInJson("Software Developer"))
                .header("Testing Header", "Test Header");
        try{
            mockMvc.perform(patchBuilder);
            fail("Did not throw exception");
        }catch (Exception exception){
            assertTrue(true);
        }
    }

    @Test
    public void addingQuestionToAssessmentReturnsAnAssessmentWithAQuestion() throws Exception {
        assessment.setName("Software Engineer");
        assessment = assessmentRepository.save(assessment);

        MockHttpServletRequestBuilder postBuilder = post("/rest/assessments/" + assessment.getId() + "/question")
                .sessionAttr("SessionID",mockUserSession)
                .contentType(contentType)
                .content(createQuestionInJson("text", "Is this a test?"))
                .header("TestingHeader", "Test Header");
        try{
            mockMvc.perform(postBuilder)
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(contentType))
                    .andExpect(jsonPath("$.id", is(assessment.getId())))
                    .andExpect(jsonPath("$.name", is("Software Engineer")));
        }catch (Exception exception){
            fail("Exception was thrown");
        }
    }

    @Test
    public void addingQuestionToNullAssessmentThrowsException(){
        MockHttpServletRequestBuilder postBuilder = post("/rest/assessments/" + 23 + "/question")
                .sessionAttr("SessionID",mockUserSession)
                .contentType(contentType)
                .content(createQuestionInJson("text", "Is this a test?"))
                .header("TestingHeader", "Test Header");
        try{
            mockMvc.perform(postBuilder);
            fail("Exception not thrown");
        }catch (Exception exception){
            assertTrue(true);
        }
    }

    @Test
    public void addingExistingQuestionToAssessmentReturnsAnAssessmentWithAQuestion() throws Exception {
        assessment.setName("Software Engineer");
        assessment = assessmentRepository.save(assessment);

        question = new Question();
        question.setType("text");
        question.setContent("This is a question?");
        question = questionRepository.save(question);

        System.out.println("Question ID: " + question.getId());
        System.out.println("Assessment ID: " + assessment.getId());

        MockHttpServletRequestBuilder postBuilder = post("/rest/assessments/" + assessment.getId() + "/question/" + question.getId()).sessionAttr("SessionID",mockUserSession);
        try{
            mockMvc.perform(postBuilder)
                    .andExpect(status().isOk());
        }catch (Exception exception){
            fail("Exception was thrown");
        }
    }

    @Test
    public void addingExistingQuestionToNullAssessmentThrowsException(){
        question = new Question();
        question.setType("text");
        question.setContent("This is a question?");
        question = questionRepository.save(question);

        MockHttpServletRequestBuilder postBuilder = post("/rest/assessments/" + 23 + "/question/" + question.getId()).sessionAttr("SessionID",mockUserSession);

        try{
            mockMvc.perform(postBuilder);
            fail("Exception not thrown");
        }catch (Exception exception){
            assertTrue(true);
        }
    }

    @Test
    public void addingNullQuestionToExistingAssessmentThrowsException(){
        assessment.setName("Software Engineer");
        assessment = assessmentRepository.save(assessment);

        MockHttpServletRequestBuilder postBuilder = post("/rest/assessments/" + assessment.getId() + "/question/" + 12).sessionAttr("SessionID",mockUserSession);

        try{
            mockMvc.perform(postBuilder);
            fail("Exception not thrown");
        }catch (Exception exception){
            assertTrue(true);
        }
    }

    @Test
    public void deletingAnAssessmentWillReturnTrueAndOkStatus(){
        assessment.setName("Software Engineer");
        assessment = assessmentRepository.save(assessment);

        MockHttpServletRequestBuilder deleteBuilder = delete("/rest/assessments/" + assessment.getId() + "/delete").sessionAttr("SessionID",mockUserSession);
        try{
            mockMvc.perform(deleteBuilder)
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(contentType));

        }catch (Exception exception){
            fail("Exception has been thrown");
        }
    }

    @Test
    public void deletingANonExistingAssessmentWillThrowException(){
        MockHttpServletRequestBuilder deleteBuilder = delete("/rest/assessments/" + 23 + "/delete").sessionAttr("SessionID",mockUserSession);

        try {
            mockMvc.perform(deleteBuilder);
            fail("Exception not thrown");
        }catch (Exception exception){
            assertTrue(true);
        }
    }

    @Test
    public void addingTargetGroupToAssessmentReturnsAnAssessmentWithATargetGroup() {
        assessment = assessmentRepository.save(assessment);
        targetGroup = new TargetGroup();
        targetGroupRepository.save(targetGroup);

        MockHttpServletRequestBuilder postBuilder = post("/rest/assessments/" + assessment.getId() + "/targetGroup/" + targetGroup.getId())
                .sessionAttr("SessionID",mockUserSession);
        try{
            mockMvc.perform(postBuilder)
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(contentType))
                    .andExpect(jsonPath("$.id", is(assessment.getId())))
                    .andExpect(jsonPath("$.targetGroup.id", is(targetGroup.getId())));
        }catch (Exception exception){
            fail("Exception was thrown");
        }
    }

    @Test
    public void addingTargetGroupToNullAssessmentThrowsException() {
        targetGroup = new TargetGroup();
        targetGroupRepository.save(targetGroup);

        MockHttpServletRequestBuilder postBuilder = post("/rest/assessments/" + 50 + "/targetGroup/" + targetGroup.getId())
                .sessionAttr("SessionID",mockUserSession);
        try{
            mockMvc.perform(postBuilder);
            fail("Exception not thrown");
        }catch (Exception exception){
            assertTrue(true);
        }
    }

    @Test
    public void addingNullTargetGroupToAssessmentThrowsException() {
        assessmentRepository.save(assessment);

        MockHttpServletRequestBuilder postBuilder = post("/rest/assessments/" + assessment.getId() + "/targetGroup/" + 50)
                .sessionAttr("SessionID",mockUserSession);
        try{
            mockMvc.perform(postBuilder);
            fail("Exception not thrown");
        }catch (Exception exception){
            assertTrue(true);
        }
    }

    @Test
    public void testSendAssessment() throws Exception {
        assessment = assessmentRepository.save(assessment);

        MockHttpServletRequestBuilder postBuilder = post("/rest/assessments/" + assessment.getId() + "/send-assessment")
                .sessionAttr("SessionID",mockUserSession)
                .contentType(contentType)
                .content(createParticipantListInJson());

        mockMvc.perform(postBuilder)
                .andExpect(status().isOk());

    }

    @Test
    public void testSendAssessmentWhenNoEmail() throws Exception {
        assessment = assessmentRepository.save(assessment);

        MockHttpServletRequestBuilder postBuilder = post("/rest/assessments/" + assessment.getId() + "/send-assessment")
                .sessionAttr("SessionID",mockUserSession)
                .contentType(contentType)
                .content(createParticipantListWithNoEmailInJson());

        mockMvc.perform(postBuilder)
                .andExpect(status().isOk());

    }


    private static String createAssessmentInJson (String assessmentName){
        return "{ \"name\": \"" + assessmentName + "\"}";
    }

    private static String createQuestionInJson (String questionType, String question){
        return "{\"type\": \"" + questionType + "\", \"content\":\"" + question + "\"}";
    }
    private static String createAddUserToAssessmentJson (String userName){
        return "{\n" +
                "  \"username\":\""+userName+"\"\n" +
                "}";
    }

    private static String createParticipantListInJson() {
        return "[{\"name\": \"name1\", \"email\": \"name1@email.com\"}]";
    }

    private static String createParticipantListWithNoEmailInJson() {
        return "[{\"name\": \"name1\"}]";
    }
}
