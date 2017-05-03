package hello.controllers;


import hello.storage.StorageFileNotFoundException;
import hello.storage.StorageService;
import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.nio.file.Paths;
import java.util.stream.Stream;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.fileUpload;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
public class FileUploadControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private StorageService storageService;

    @InjectMocks
    private FileUploadController fileUploadController;

    @Before
    public void setUp(){
        MockitoAnnotations.initMocks(this);
        mvc = MockMvcBuilders.standaloneSetup(fileUploadController).build();
    }

    @Test
    public void shouldSaveUploadedFile() throws Exception {
        MockMultipartFile multipartFile =
                new MockMultipartFile("uploadedFile", "test.txt", "text/plain", "Spring Framework".getBytes());
        this.mvc.perform(fileUpload("/files/upload").file(multipartFile))
                .andExpect(status().isOk());

        then(this.storageService).should().store(multipartFile);
    }

}
