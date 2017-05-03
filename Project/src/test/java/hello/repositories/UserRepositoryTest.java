package hello.repositories;

import hello.models.Role;
import hello.models.User;
import hello.storage.StorageService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DirtiesContext
public class UserRepositoryTest {
    //Just to test this
    @Autowired
    private UserRepository userRepository;

    @MockBean
    private StorageService storageService;

    @Test
    public void testUserRepository() {
        User user = new User();
        user.setUsername("user1");
        user.setPassword("user1_pass");
        userRepository.deleteAll();
        userRepository.save(user);

        assertEquals(1, userRepository.count());
        assertEquals(user.getUsername(), "user1");

    }

    @Test
    public void testUserRole() {
        User user = new User();
        user.setUsername("2");

        Role role = new Role();
        role.setRole("Admin");
        user.setRole(role);

        assertEquals(user.getRole(), role);
    }


}