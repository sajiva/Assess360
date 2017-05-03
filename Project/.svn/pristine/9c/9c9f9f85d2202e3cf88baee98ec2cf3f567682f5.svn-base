package hello.repositories;

import hello.models.Role;
import hello.storage.StorageService;
import org.junit.Before;
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
public class RoleRepositoryTest {

    @Autowired
    private RoleRepository roleRepository;

    @MockBean
    private StorageService storageService;

    private Role role;

    @Before
    public void setup() {
        role = new Role();
        role.setId(1);
        role.setRole("Administrator");
        roleRepository.save(role);
    }

    @Test
    public void testRoleRepository1() {

        assertEquals(1, roleRepository.count());
        assertEquals(role.getId(), 1);
        assertEquals(role.getRole(), "Administrator");
    }

    @Test
    public void testRoleRepository2() {
        Role role1 = new Role();
        role1.setRole("Participant");

        roleRepository.save(role1);
        assertEquals(2, roleRepository.count());
    }

}