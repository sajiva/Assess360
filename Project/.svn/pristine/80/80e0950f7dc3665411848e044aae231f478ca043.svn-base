package hello.storage;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class FileSystemStorageServiceTest {

    @Autowired
    private FileSystemStorageService fileSystemStorageService;
    
    private ClassPathResource resource;
                                 
    @Before
    public void setUp() {
      resource = new ClassPathResource("testupload.txt", getClass());
    }

    @Test
    public void initShouldCreateADirectory() throws IOException {
      assertTrue(Files.exists(Paths.get(new StorageProperties().getLocation())));
    }

    @Test
    public void initShouldThrowIOExceptionIfFileExists() throws IOException {
      try{                               
        fileSystemStorageService.init();
        fail("Exception thrown when it shouldn't");
      }catch (StorageException exception){
        assertTrue(true);
      }
    }
    
    @Test
    public void storeShouldStoreFile() throws IOException {
        MultipartFile multipartFile = new MockMultipartFile(resource.getFilename(), resource.getFilename(), "text/plain", resource.getInputStream());
        fileSystemStorageService.store(multipartFile);
        assertTrue(Files.exists(Paths.get(new StorageProperties().getLocation() + "testupload.txt")));
    }
    
    @Test
    public void storeShouldThrowStorageExceptionOnEmptyFile(){
        MultipartFile file = new MockMultipartFile("blabla", new byte[]{});
        try{
            fileSystemStorageService.store(file);
            fail("Exception has not been thrown when it was supposed to be thrown");
        }catch (StorageException storageException){
            assertTrue(true);
        }
    }
    
    @Test
    public void testLoadAllShouldLoadAllFiles() throws IOException {
        MultipartFile multipartFile = new MockMultipartFile(resource.getFilename(), resource.getFilename(), "text/plain", resource.getInputStream());
        fileSystemStorageService.store(multipartFile);
        Stream<Path> pathStream = fileSystemStorageService.loadAll();
        assertEquals(pathStream.count(), 1);
    }
    
    @Test
    public void loadAllShouldThrowExceptionSinceNoFileWasSaved(){
      FileSystemUtils.deleteRecursively(Paths.get(new StorageProperties().getLocation()).toFile());
       try{
           fileSystemStorageService.loadAll();
           fail("Did not throw exception");
       }catch (StorageException ioException){
           assertTrue(true);
       }
    }
    
    @Test
    public void loadLoadsFile() throws IOException {
        MultipartFile multipartFile = new MockMultipartFile(resource.getFilename(), resource.getFilename(), "text/plain", resource.getInputStream());
        fileSystemStorageService.store(multipartFile);
        Path actualFile = fileSystemStorageService.load(resource.getFilename());
        assertEquals(resource.getFilename(), actualFile.getFileName().toString());
    }
    
    @Test
    public void loadAsResourceReturnsFileAsResource() throws IOException {
        MultipartFile multipartFile = new MockMultipartFile(resource.getFilename(), resource.getFilename(), "text/plain", resource.getInputStream());
        fileSystemStorageService.store(multipartFile);
        Resource actualResource = fileSystemStorageService.loadAsResource(resource.getFilename());
        assertNotNull(actualResource);
        assertEquals(resource.getFilename(), actualResource.getFilename());
    }
    
    @Test
    public void loadAsResourceThrowsExceptionSinceResourceDoesNotExist() throws IOException {
        try{
            fileSystemStorageService.loadAsResource(resource.getFilename());
            fail("Did not throw exception");
        }catch (StorageFileNotFoundException storageFileNotFoundException){
            assertTrue(true);
        }
    }
}
