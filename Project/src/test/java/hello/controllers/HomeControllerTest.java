 package hello.controllers;

 import hello.models.Role;
 import hello.models.User;
 import hello.models.UserSession;
 import hello.repositories.RoleRepository;
 import hello.repositories.UserRepository;
 import hello.repositories.UserSessionRepository;
 import org.junit.Before;
 import org.junit.Test;
 import org.junit.runner.RunWith;
 import org.mockito.InjectMocks;
 import org.mockito.MockitoAnnotations;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
 import org.springframework.boot.test.context.SpringBootTest;
 import org.springframework.test.annotation.DirtiesContext;
 import org.springframework.test.context.junit4.SpringRunner;
 import org.springframework.test.web.servlet.MockMvc;
 import org.springframework.test.web.servlet.setup.MockMvcBuilders;
 import org.springframework.web.context.WebApplicationContext;

 import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
 import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
 import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;
 import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

 @RunWith(SpringRunner.class)
 @AutoConfigureMockMvc
 @SpringBootTest
 @DirtiesContext
 public class HomeControllerTest {

     @Autowired
     private MockMvc mvc;

     @InjectMocks
     private HomeController homeController;

     private User mockUser;
     private UserSession mockUserSession;

     @Autowired
     private UserRepository userRepository;

     @Autowired
     private RoleRepository roleRepository;

     @Autowired
     private UserSessionRepository userSessionRepository;
     @Autowired
     private WebApplicationContext webApplicationContext;

     @Before
     public void setUp() {
         MockitoAnnotations.initMocks(this);
         this.mvc = webAppContextSetup(webApplicationContext).build();

         /*******************************************************************/
         Role thisRole=new Role();
         thisRole.setId(1);
         thisRole.setRole("user");
         roleRepository.save(thisRole);

         /*******************************************************************/
         this.mockUser = new User();
         this.mockUser.setUsername("user1");
         this.mockUser.setPassword("user_pass");
         this.mockUser.setRole(thisRole);
         userRepository.save(this.mockUser);

         /*******************************************************************/
         this.mockUserSession=new UserSession();
         this.mockUserSession.setLinkedUser(this.mockUser);
         userSessionRepository.save(this.mockUserSession);
     }

     @Test
      public void shouldReturnApponGetAssessment() throws Exception {
         mvc.perform(get("/app/assessments/create").sessionAttr("SessionID",this.mockUserSession))
                 .andExpect(status().isOk())
                 .andExpect(view().name("app"));
     }

      @Test
      public void shouldReturnAppOnAddAssessment() throws Exception{
         mvc.perform(get("/app/assessments/").sessionAttr("SessionID",this.mockUserSession))
                 .andExpect(status().isOk())
                 .andExpect(view().name("app"));
     }

     @Test
     public void shouldReturnApp() throws Exception {
         mvc.perform(get("/").sessionAttr("SessionID",this.mockUserSession))
                 .andExpect(status().isOk())
                 .andExpect(view().name("app")) ;
     }

     @Test
     public void nullUserSessionShouldRedirectToLogin() throws Exception {
         userSessionRepository.deleteAll();

         mvc.perform(get("/app/assessments").sessionAttr("SessionID",this.mockUserSession))
                 .andExpect(status().is(302));
     }

     @Test
     public void nullSessionShouldRedirectToLogin() throws Exception {
         mvc.perform(get("/app/assessments").sessionAttr("blabla",mockUserSession))
                 .andExpect(status().is(302));
     }

     @Test
     public void nullUserShouldRedirectToLogin() throws Exception {
         mockUserSession.setLinkedUser(null);
         userSessionRepository.save(mockUserSession);

         mvc.perform(get("/app/assessments").sessionAttr("SessionID",this.mockUserSession))
                 .andExpect(status().is(302));
     }

 }