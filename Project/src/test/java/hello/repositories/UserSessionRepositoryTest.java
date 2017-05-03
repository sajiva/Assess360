package hello.repositories;

import hello.models.User;
import hello.models.UserSession;
import hello.storage.StorageService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DirtiesContext
public class UserSessionRepositoryTest {
    @Autowired
    private  UserSessionRepository userSessionRepository;

    @Autowired
    private UserRepository userRepository;

    @MockBean
    private StorageService storageService;

    @Test
    public void testUserSessionRepository(){
        UserSession userSession = new UserSession();
        User user = new User();
        user.setUsername("username");
        user.setPassword("password");

        user = userRepository.save(user);

        userSession.setLinkedUser(user);

        userSession = userSessionRepository.save(userSession);

        assertEquals(1, userSessionRepository.count());
        assertEquals(user, userSession.getLinkedUser());
        assertNotEquals("", userSession.getSessionID());
    }
}
