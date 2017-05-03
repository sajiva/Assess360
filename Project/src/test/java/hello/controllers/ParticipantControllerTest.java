package hello.controllers;

import hello.Application;
import hello.models.Participant;
import hello.repositories.ParticipantRepository;
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

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@WebAppConfiguration
@DirtiesContext
public class ParticipantControllerTest {

    private final MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    private MockMvc mockMvc;
    private Participant participant;

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() {
        mockMvc = webAppContextSetup(webApplicationContext).build();
        participantRepository.deleteAll();

        participant = new Participant();
        participant.setName("name1");
        participant.setEmail("email1");
        participant.setPhone("123456");
        participantRepository.save(participant);
    }

    @Test
    public void getParticipantsReturnsAllParticipants() throws Exception {
        mockMvc.perform(get("/rest/participants"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    public void getParticipantReturnsAParticipant() throws Exception {
        mockMvc.perform(get("/rest/participants/" + participant.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.id", is(participant.getId())))
                .andExpect(jsonPath("$.name", is(participant.getName())))
                .andExpect(jsonPath("$.email", is(participant.getEmail())))
                .andExpect(jsonPath("$.phone", is(participant.getPhone())));
    }

    @Test
    public void gettingNonExistentParticipantReturnsNotFoundStatus() throws Exception {
        mockMvc.perform(get("/rest/participants/10"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void addParticipantReturnsCreatedStatusAndParticipantJSON() throws Exception {
        MockHttpServletRequestBuilder postBuilder = post("/rest/participant")
                .contentType(contentType)
                .content(createParticipantInJson("aname", "anemail", "aphone"));

        mockMvc.perform(postBuilder)
                .andExpect(status().isCreated())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("aname")));
    }

    @Test
    public void addParticipantAddsNewParticipant() throws Exception {
        MockHttpServletRequestBuilder postBuilder = post("/rest/participant")
                .contentType(contentType)
                .content(createParticipantInJson("aname", "anemail", "aphone"));
        mockMvc.perform(postBuilder);

        assertEquals(participantRepository.count(), 2);
    }

    @Test
    public void addParticipantsAddsListOfParticipants() throws Exception {

        MockHttpServletRequestBuilder postBuilder = post("/rest/participants")
                .contentType(contentType)
                .content("[" + createParticipantInJson("name2", "email2", "123456789") + ", " +
                        createParticipantInJson("name3", "email3", "123456890") + "]");
        mockMvc.perform(postBuilder);

        assertEquals(3, participantRepository.count());
    }

    @Test
    public void updateParticipantShouldUpdateParticipantAndReturnOK() throws Exception {
        MockHttpServletRequestBuilder putBuilder = put("/rest/participants/" + participant.getId())
                .contentType(contentType)
                .content(createParticipantInJson("name2", "email2", "123456"));

        mockMvc.perform(putBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.id", is(participant.getId())))
                .andExpect(jsonPath("$.name", is("name2")))
                .andExpect(jsonPath("$.email", is("email2")));
    }

    @Test
    public void nullParticipantThrowsException() {
        MockHttpServletRequestBuilder putBuilder = put("/rest/participants/10")
                .contentType(contentType)
                .content(createParticipantInJson("name2", "email2", "123456"));

        try {
            mockMvc.perform(putBuilder);
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }
    }

    @Test
    public void deleteParticipant() throws Exception {
        MockHttpServletRequestBuilder deleteBuilder = delete("/rest/participants/" + participant.getId());

        mockMvc.perform(deleteBuilder)
                .andExpect(status().isOk());
    }

    @Test
    public void deleteParticipantDeletesParticipant() throws Exception {
        MockHttpServletRequestBuilder deleteBuilder = delete("/rest/participants/" + participant.getId());

        mockMvc.perform(deleteBuilder);

        assertEquals(participantRepository.count(), 0);
    }

    @Test
    public void deletingNullParticipantThrowsException() {
        MockHttpServletRequestBuilder deleteBuilder = delete("/rest/participants/10");

        try {
            mockMvc.perform(deleteBuilder);
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }
    }


    private static String createParticipantInJson(String name, String email, String phone){
        return "{\"name\": \"" + name + "\", \"email\":\"" + email + "\", \"phone\": \"" + phone + "\"}";
    }

}