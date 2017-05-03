package hello.repositories;

import hello.models.FileResource;
import hello.models.Role;
import hello.models.User;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.StreamSupport;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@Transactional
@DirtiesContext
@SpringBootTest
public class FileResourceRepositoryTest {

    @Autowired
    private FileResourceRepository fileResourceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Test
    public void creatingAndSavingFileResourceWithBuilderGivesFileResource(){
        final String filePath = "/uploads/images/";
        final String fileName = "profile-img.png";

        final User uploadedBy = createTestUser();

        final String fileDescription = "This is a test";

        FileResource fileResource = FileResource.builder()
                .setFilePath(filePath)
                .setFileName(fileName)
                .setUploadedBy(uploadedBy)
                .setFileDescription(fileDescription)
                .build();

        FileResource entity = fileResourceRepository.save(fileResource);

        assertNotEquals("", entity.getFileResourceId());
        assertEquals(filePath, entity.getFilePath());
        assertEquals(fileName, entity.getFileName());
        assertEquals(uploadedBy.getUsername(), entity.getUploadedBy().getUsername());
        assertEquals(uploadedBy.getPassword(), entity.getUploadedBy().getPassword());
        assertEquals(fileDescription, entity.getFileDescription());
    }

    @Test
    public void saveSomeFileResourceEntitiesAndRecieveIterable(){
        final User user = createTestUser();
        final String filePath = "/uploads/images/";
        final String fileBaseName = "profile-image";
        final String fileExtension = ".png";
        final String baseFileDescription = "Some Test File #";

        for(int fileNumber = 1; fileNumber < 3; fileNumber++){
            fileResourceRepository.save(FileResource.builder()
                    .setFilePath(filePath)
                    .setFileName(fileBaseName + fileNumber + fileExtension)
                    .setUploadedBy(user)
                    .setFileDescription(baseFileDescription + fileNumber)
                    .build());
        }

        final Iterable<FileResource> fileResources = fileResourceRepository.findAll();
        assertNotNull(fileResources);

        final FileResource fileResource = StreamSupport.stream(fileResources.spliterator(), false).findFirst().get();
        assertNotNull(fileResource);



    }

    public User createTestUser(){
        User user = new User("testUser");
        user.setPassword("testPassword");

        user.setRole(createTestRole());

        return userRepository.save(user);
    }

    public Role createTestRole(){
        Role role = new Role();
        role.setRole("user");

        return roleRepository.save(role);
    }
}
