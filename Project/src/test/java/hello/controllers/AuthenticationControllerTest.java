package hello.controllers;


import hello.Application;
import hello.models.User;
import hello.models.UserSession;
import hello.repositories.UserRepository;
import hello.repositories.UserSessionRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.web.context.WebApplicationContext;

import java.nio.charset.Charset;
import java.util.ArrayList;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@WebAppConfiguration
@DirtiesContext
public class AuthenticationControllerTest {

    private final MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));


    private final String baseUrlTemplate = "/rest/session";

    private MockMvc mockMvc;

    private User testUser;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSessionRepository userSessionRepository;

    @Autowired
    private MockHttpSession mockHttpSession;


    @InjectMocks
    private AuthenticationController authenticationController;

    @Before
    public void setUp(){
        mockMvc = webAppContextSetup(webApplicationContext).build();
        AuthenticationController authenticationController = new AuthenticationController();
        userSessionRepository.deleteAll();
        testUser = new User("test-user");
        testUser.setPassword("test_pass");
        testUser.setEmail("name@domain.com");
        testUser.setOrganization("TestCompany");
        testUser.setTitle("Hiring Manager");
        userRepository.save(testUser);
    }

    @Test
    public void loginWithCorrectCredentialsWillReturnOKAndCreateUserSession() throws Exception {
        MockHttpServletRequestBuilder postBuilder = post(baseUrlTemplate + "/login")
                .contentType(contentType)
                .content(createLoginRequestInJson("test-user", "test_pass"));

        mockMvc.perform(postBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Successful Login")));

        long expectedCount = 1;
        assertEquals(expectedCount, userSessionRepository.count());
    }

    @Test
    public void loginWithIncorrectUserNameWillReturnFailedLoginResponse() throws Exception {
        MockHttpServletRequestBuilder postBuilder = post(baseUrlTemplate + "/login")
                .contentType(contentType)
                .content(createLoginRequestInJson("incorrect-username", "test_pass"));

        mockMvc.perform(postBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("User Not found")));

        long expectedCount = 0;
        assertEquals(0, userSessionRepository.count());
    }


    @Test
    public void loginWithIncorrectPasswordWillReturnFailedLoginResponse() throws Exception {
        MockHttpServletRequestBuilder postBuilder = post(baseUrlTemplate + "/login")
                .contentType(contentType)
                .content(createLoginRequestInJson("test-user", "incorrect_pass"));

        mockMvc.perform(postBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Password Incorrect")));

        long expectedCount = 0;
        assertEquals(0, userSessionRepository.count());
    }

    @Test
    public void logoutWillReturnLogoutResponseAndOkStatus() throws Exception {
        MockHttpServletRequestBuilder loginBuilder = post(baseUrlTemplate + "/login")
                .contentType(contentType)
                .content(createLoginRequestInJson("test-user", "test_pass"));

        mockMvc.perform(loginBuilder);

        UserSession userSession = getTestUserSession();
        mockHttpSession.setAttribute("SessionID", userSession);
        mockHttpSession.setAttribute("user", userSession.getLinkedUser());

        MockHttpServletRequestBuilder logoutBuilder = post(baseUrlTemplate + "/logout")
                .session(mockHttpSession);

        mockMvc.perform(logoutBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Successful Logout")));
    }

    @Test
    public void logoutWillThrowExceptionWhenNoSessionIsThere(){
        MockHttpServletRequestBuilder logoutBuilder = post(baseUrlTemplate + "/logout")
                .session(mockHttpSession);
        try{
            mockMvc.perform(logoutBuilder);
            fail("Did not throw exception");
        }catch (Exception exception){
            assertNotNull(exception);
        }
    }

    @Test
    public void isLoggedInWillReturnLoginResponseOfSuccessIfLoggedIn() throws Exception {
        MockHttpServletRequestBuilder loginBuilder = post(baseUrlTemplate + "/login")
                .contentType(contentType)
                .content(createLoginRequestInJson("test-user", "test_pass"));

        mockMvc.perform(loginBuilder);


        UserSession userSession = getTestUserSession();
        mockHttpSession.setAttribute("SessionID", userSession);
        mockHttpSession.setAttribute("user", userSession.getLinkedUser());

        MockHttpServletRequestBuilder isLoggedInBuilder = get(baseUrlTemplate + "/is-logged-in")
                .session(mockHttpSession);

        mockMvc.perform(isLoggedInBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.sessionKey", is(userSession.getSessionID())));
    }

    @Test
    public void isLoggedInWillReturnFailingLoginResponseIfNotLoggedIn() throws Exception {
        mockHttpSession.setAttribute("SessionID", null);
        MockHttpServletRequestBuilder isLoggedInBuilder = get(baseUrlTemplate + "/is-logged-in")
                .session(mockHttpSession);
        mockMvc.perform(isLoggedInBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.success", is(false)));
    }

    private UserSession getTestUserSession(){
        ArrayList<UserSession> userSessions = (ArrayList<UserSession>) userSessionRepository.findAll();
        return userSessions.get(0);
    }

    private static String createLoginRequestInJson(String username, String password){
        return "{\"username\": \"" + username + "\", \"password\":\"" + password + "\"}";
    }


}
