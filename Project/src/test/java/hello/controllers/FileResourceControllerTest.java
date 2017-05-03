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
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import java.nio.charset.Charset;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.fileUpload;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@AutoConfigureMockMvc
@DirtiesContext
public class FileResourceControllerTest {

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
    public void setUp(){
        MockitoAnnotations.initMocks(this);
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
    }

    @Test
    public void testUploadUserImage() throws Exception {
        MockMultipartFile multipartFile =
                new MockMultipartFile(
                        "uploadedFile",
                        "test_1.txt",
                        "text/plain",
                        "Spring Framework".getBytes());

        mockMvc.perform(fileUpload("/rest/image")
                .file(multipartFile)
                .sessionAttr("SessionID", mockUserSession))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.fileName", is("test_1.txt")));
    }

    @Test
    public void testGetUserImage() throws Exception {
        MockMultipartFile multipartFile =
                new MockMultipartFile(
                        "uploadedFile",
                        "test_2.txt",
                        "text/plain",
                        "Spring Framework".getBytes());

        mockMvc.perform(fileUpload("/rest/image")
                .file(multipartFile)
                .sessionAttr("SessionID", mockUserSession));

        mockMvc.perform(get("/rest/image/" + mockUser.getUsername())
                .sessionAttr("SessionID",mockUserSession))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.IMAGE_PNG));
    }

    @Test
    public void testGetUserImageWhenNoImage() throws Exception {

        mockMvc.perform(get("/rest/image/" + mockUser.getUsername())
                .sessionAttr("SessionID",mockUserSession))
                .andExpect(status().isOk());
    }

}
