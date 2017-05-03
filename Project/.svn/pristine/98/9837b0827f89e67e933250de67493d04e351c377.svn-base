package hello.controllers;

import hello.Application;
import hello.models.Role;
import hello.models.User;
import hello.models.UserSession;
import hello.repositories.RoleRepository;
import hello.repositories.UserRepository;
import hello.repositories.UserSessionRepository;
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

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@WebAppConfiguration
@DirtiesContext
public class UserControllerTest {

    private final MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    private MockMvc mockMvc;
    private User mockUser;
    private UserSession mockUserSession;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserSessionRepository userSessionRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() {
        mockMvc = webAppContextSetup(webApplicationContext).build();

        Role thisRole = new Role();
        thisRole.setId(1);
        thisRole.setRole("user");
        roleRepository.save(thisRole);

        mockUser = new User();
        mockUser.setUsername("user1");
        mockUser.setPassword("user_pass");
        mockUser.setRole(thisRole);
        userRepository.save(mockUser);

        mockUserSession = new UserSession();
        mockUserSession.setLinkedUser(mockUser);
        userSessionRepository.save(mockUserSession);
    }

    @Test
    public void testGetCurrentUser() throws Exception {
        mockMvc.perform(get("/rest/currentUser")
                .sessionAttr("SessionID", mockUserSession))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.username", is(mockUser.getUsername())));
    }

    @Test
    public void getCurrentUserWhenNotLoggedInShouldThrowException() {
        try {
            mockMvc.perform(get("/rest/currentUser"));
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }
    }

    @Test
    public void testUpdateUser() throws Exception {
        MockHttpServletRequestBuilder patchBuilder = patch("/rest/currentUser")
                .sessionAttr("SessionID", mockUserSession)
                .contentType(contentType)
                .content(createUserInJson("Developer", "Org1", "user1@email.com"));

        mockMvc.perform(patchBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.username", is(mockUser.getUsername())))
                .andExpect(jsonPath("$.password", is(mockUser.getPassword())))
                .andExpect(jsonPath("$.title", is("Developer")))
                .andExpect(jsonPath("$.organization", is("Org1")))
                .andExpect(jsonPath("$.email", is("user1@email.com")));

    }

    @Test
    public void testRegisterUser() throws Exception {
        MockHttpServletRequestBuilder postBuilder = post("/rest/register")
                .contentType(contentType)
                .content(createNewUserInJson("newuser", "newuser_pass"));

        mockMvc.perform(postBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.username", is("newuser")));
    }

    @Test
    public void registerUserWithExistingUsernameThrowsException() throws Exception {
        MockHttpServletRequestBuilder postBuilder = post("/rest/register")
                .contentType(contentType)
                .content(createNewUserInJson("User1", "newuser_pass"));

        try {
            mockMvc.perform(postBuilder);
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }
    }

    @Test
    public void registerUserWhenLoggedInThrowsException() throws Exception {
        MockHttpServletRequestBuilder postBuilder = post("/rest/register")
                .sessionAttr("SessionID", mockUserSession)
                .contentType(contentType)
                .content(createNewUserInJson("blabla", "newuser_pass"));

        try {
            mockMvc.perform(postBuilder);
            fail("Exception not thrown");
        } catch (Exception e) {
            assertTrue(true);
        }
    }

    private static String createUserInJson(String title, String organization, String email) {
        return "{\"title\": \"" + title + "\", \"organization\": \"" + organization + "\", \"email\": \"" + email + "\"}";
    }

    private static String createNewUserInJson(String name, String password) {
        return "{\"username\": \"" + name + "\", \"password\": \"" + password + "\"}";
    }


}