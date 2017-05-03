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
import java.util.HashSet;
import java.util.Set;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@WebAppConfiguration
@DirtiesContext
public class TargetGroupControllerTest {

    private final MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    private MockMvc mockMvc;
    private User mockUser;
    private UserSession mockUserSession;
    private TargetGroup targetGroup;
    private Participant participant;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserSessionRepository userSessionRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private TargetGroupRepository targetGroupRepository;

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() {
        mockMvc = webAppContextSetup(webApplicationContext).build();

        /*******************************************************************/
        Role thisRole=new Role();
        thisRole.setId(1);
        thisRole.setRole("user");
        roleRepository.save(thisRole);

        /*******************************************************************/
        mockUser = new User();
        mockUser.setUsername("user1");
        mockUser.setPassword("user_pass");
        mockUser.setRole(thisRole);
        userRepository.save(mockUser);

        /*******************************************************************/
        userSessionRepository.deleteAll();
        mockUserSession=new UserSession();
        mockUserSession.setLinkedUser(mockUser);
        userSessionRepository.save(mockUserSession);

        /*******************************************************************/


        targetGroup = new TargetGroup();
        targetGroup.setName("group1");
        targetGroupRepository.save(targetGroup);

    }

    @Test
    public void getTargetGroupsReturnsAllTargetGroups() throws Exception {
        Set<User> userSet = new HashSet<>();
        userSet.add(mockUser);
        targetGroup.setUsersSet(userSet);
        targetGroupRepository.save(targetGroup);

        mockMvc.perform(get("/rest/targetGroups")
                .sessionAttr("SessionID",mockUserSession))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    @Test
    public void getTargetGroupReturnsATargetGroup() throws Exception {
        mockMvc.perform(get("/rest/targetGroups/" + targetGroup.getId())
                .sessionAttr("SessionID",mockUserSession))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.id", is(targetGroup.getId())));
    }

    @Test
    public void gettingNonExistentTargetGroupReturnsNotFoundStatus() throws Exception {
        mockMvc.perform(get("/rest/targetGroups/50")
                .sessionAttr("SessionID",mockUserSession))
                .andExpect(status().isNotFound());
    }

    @Test
    public void addTargetGroupReturnsCreatedStatus() throws Exception {
        MockHttpServletRequestBuilder postBuilder = post("/rest/targetGroups")
                .sessionAttr("SessionID",mockUserSession)
                .contentType(contentType)
                .content(createJson("group2"));

        mockMvc.perform(postBuilder)
                .andExpect(status().isCreated())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("group2")));
    }

    @Test
    public void addTargetGroupAddsNewTargetGroup() throws Exception {
        MockHttpServletRequestBuilder postBuilder = post("/rest/targetGroups")
                .sessionAttr("SessionID",mockUserSession)
                .contentType(contentType)
                .content(createJson("group2"));
        
        long beforeCount = targetGroupRepository.count();

        mockMvc.perform(postBuilder);
        assertEquals(beforeCount+1, targetGroupRepository.count());
    }

    @Test
    public void addTargetGroupWhenNotSignedInThrowsException() throws Exception {
        MockHttpServletRequestBuilder postBuilder = post("/rest/targetGroups")
                .contentType(contentType)
                .content(createJson("group2"));

        try {
            mockMvc.perform(postBuilder);
            fail("Did not throw exception");
        } catch (Exception e) {
            assertTrue(true);
        }
    }

    @Test
    public void updateTargetGroupUpdatesATargetGroup() throws Exception {
        MockHttpServletRequestBuilder putBuilder = put("/rest/targetGroups/" + targetGroup.getId())
                .sessionAttr("SessionID",mockUserSession)
                .contentType(contentType)
                .content(createJson("updated group"));

        mockMvc.perform(putBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.id", is(targetGroup.getId())))
                .andExpect(jsonPath("$.name", is("updated group")));
    }

    @Test
    public void updateNullTargetGroupThrowsException() {
        MockHttpServletRequestBuilder putBuilder = put("/rest/targetGroups/50")
                .sessionAttr("SessionID",mockUserSession)
                .contentType(contentType)
                .content(createJson("group2"));

        try {
            mockMvc.perform(putBuilder);
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }
    }

    @Test
    public void deleteTargetGroupReturnsStatusOK() throws Exception {
        MockHttpServletRequestBuilder deleteBuilder = delete("/rest/targetGroups/" + targetGroup.getId())
                .sessionAttr("SessionID",mockUserSession);

        mockMvc.perform(deleteBuilder)
                .andExpect(status().isOk());
    }

    @Test
    public void deleteTargetGroupDeletesATargetGroup() throws Exception {
        MockHttpServletRequestBuilder deleteBuilder = delete("/rest/targetGroups/" + targetGroup.getId())
                .sessionAttr("SessionID",mockUserSession);
        long beforeCount = targetGroupRepository.count();

        mockMvc.perform(deleteBuilder);
        assertEquals(beforeCount-1, targetGroupRepository.count());
    }

    @Test
    public void deletingNullTargetGroupThrowsException() {
        MockHttpServletRequestBuilder deleteBuilder = delete("/rest/targetGroups/50")
                .sessionAttr("SessionID",mockUserSession);

        try {
            mockMvc.perform(deleteBuilder);
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }
    }

    @Test
    public void addNewParticipantToTargetGroup() throws Exception {
        MockHttpServletRequestBuilder postBuilder = post("/rest/targetGroups/" + targetGroup.getId() + "/participants")
                .sessionAttr("SessionID",mockUserSession)
                .contentType(contentType)
                .content(createJson("participant2"));

        mockMvc.perform(postBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.id", is(targetGroup.getId())))
                .andExpect(jsonPath("$.participantSet", hasSize(1)))
                .andExpect(jsonPath("$.participantSet[0].name", is("participant2")));
    }

    @Test
    public void addNewParticipantToNullTargetGroupThrowsException() {
        MockHttpServletRequestBuilder postBuilder = post("/rest/targetGroups/50/participants")
                .sessionAttr("SessionID",mockUserSession)
                .contentType(contentType)
                .content(createJson("participant2"));

        try {
            mockMvc.perform(postBuilder);
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }
    }

    @Test
    public void addNewParticipantListToTargetGroup() throws Exception {
        MockHttpServletRequestBuilder postBuilder = post("/rest/targetGroups/" + targetGroup.getId() + "/participantList")
                .contentType(contentType)
                .content(createParticipantsListInJson("participant1", "participant2"));

        mockMvc.perform(postBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.id", is(targetGroup.getId())))
                .andExpect(jsonPath("$.participantSet", hasSize(2)));
    }

    @Test
    public void addNewParticipantListToNullTargetGroupThrowsException() {
        MockHttpServletRequestBuilder postBuilder = post("/rest/targetGroups/50/participantList")
                .contentType(contentType)
                .content(createParticipantsListInJson("participant1", "participant2"));

        try {
            mockMvc.perform(postBuilder);
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }
    }

    @Test
    public void addExistingParticipantToTargetGroup() throws Exception {
        participant = new Participant();
        participant.setName("participant2");
        participantRepository.save(participant);

        MockHttpServletRequestBuilder postBuilder = post("/rest/targetGroups/" + targetGroup.getId() + "/participants/" + participant.getId())
                .sessionAttr("SessionID",mockUserSession);

        mockMvc.perform(postBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.id", is(targetGroup.getId())))
                .andExpect(jsonPath("$.participantSet", hasSize(1)))
                .andExpect(jsonPath("$.participantSet[0].id", is(participant.getId())))
                .andExpect(jsonPath("$.participantSet[0].name", is(participant.getName())));
    }

    @Test
    public void addExistingParticipantToNullTargetGroupThrowsException() {
        participant = new Participant();
        participant.setName("participant2");
        participantRepository.save(participant);

        MockHttpServletRequestBuilder postBuilder = post("/rest/targetGroups/50/participants/" + participant.getId())
                .sessionAttr("SessionID",mockUserSession);

        try {
            mockMvc.perform(postBuilder);
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }
    }

    @Test
    public void addNullParticipantsToTargetGroupThrowsException() {
        MockHttpServletRequestBuilder postBuilder = post("/rest/targetGroups/" + targetGroup.getId() + "/participants/20")
                .sessionAttr("SessionID",mockUserSession);

        try {
            mockMvc.perform(postBuilder);
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }
    }

    @Test
    public void removeParticipantFromTargetGroup() throws Exception {
        addParticipant();
        MockHttpServletRequestBuilder putBuilder = put("/rest/targetGroups/" + targetGroup.getId() + "/participants/" + participant.getId())
                .sessionAttr("SessionID",mockUserSession);

        mockMvc.perform(putBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.id", is(targetGroup.getId())))
                .andExpect(jsonPath("$.participantSet", hasSize(0)));
    }

    @Test
    public void removeParticipantsFromNullTargetGroupThrowsException() {
        MockHttpServletRequestBuilder putBuilder = put("/rest/targetGroups/50/participants/1")
                .sessionAttr("SessionID",mockUserSession);

        try {
            mockMvc.perform(putBuilder);
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }
    }

    @Test
    public void removeNullParticipantsFromTargetGroupThrowsException() {
        MockHttpServletRequestBuilder putBuilder = put("/rest/targetGroups/" + targetGroup.getId() + "/participants/10")
                .sessionAttr("SessionID",mockUserSession);

        try {
            mockMvc.perform(putBuilder);
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }
    }

    @Test
    public void getAssessmentsForTargetGroupReturnsAssessments() throws Exception {
        Assessment assessment = new Assessment();
        assessment.setTargetGroup(targetGroup);
        assessmentRepository.save(assessment);

        mockMvc.perform(get("/rest/targetGroups/" + targetGroup.getId() + "/assessments")
                .sessionAttr("SessionID",mockUserSession))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is(assessment.getId())));
    }

    @Test
    public void getAssessmentsForNullTargetGroupThrowsException() {
        try {
            mockMvc.perform(get("/rest/targetGroups/50/assessments")
                    .sessionAttr("SessionID",mockUserSession));
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }
    }


    private static String createJson(String name){
        return "{\"name\": \"" + name + "\"}";
    }

    private static String createParticipantsListInJson(String name1, String name2) {
        return "[{\"name\": \"" + name1 + "\"}, {\"name\": \"" + name2 + "\"}]";
    }

    private void addParticipant() {
        participant = new Participant();
        participant.setName("participant1");
        participantRepository.save(participant);

        Set<Participant> participantSet = new HashSet<>();
        participantSet.add(participant);
        targetGroup.setParticipantSet(participantSet);
        targetGroupRepository.save(targetGroup);
    }

}