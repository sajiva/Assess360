package hello.controllers;

import hello.Application;
import hello.models.Assessment;
import hello.models.Question;
import hello.repositories.AssessmentRepository;
import hello.repositories.QuestionRepository;
import hello.repositories.exceptions.AssessmentNotFoundException;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.util.NestedServletException;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@WebAppConfiguration
@DirtiesContext
public class QuestionControllerTest{


    private final MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    private MockMvc mockMvc;

    private Assessment assessment;

    private Question question;

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private QuestionRepository questionRepository;
    

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setUp() {
        this.mockMvc = webAppContextSetup(webApplicationContext).build();

        this.assessmentRepository.deleteAll();
        this.questionRepository.deleteAll();

        question = new Question();
    }

    @Test
    public void getAnAssessmentQuestion() throws Exception {
    		question.setContent("Question Content");
    		question.setType("Question Type");
    	    question = questionRepository.save(question);
   
    	  	mockMvc.perform(get("/rest/questions/" + question.getId() + "/"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    	  	

    }
    @Test 
    public void getAllAssessmentQuestions() throws Exception{
    	Question question2 = new Question();

    		question.setContent("Question Content");
    		question.setType("Question Type");
    		question2.setContent("Question Content2");
    		question2.setType("Question Type2");
 
      		question  = questionRepository.save(question);
      		question2 = questionRepository.save(question2);

      		mockMvc.perform(get("/rest/questions/"))
      			.andExpect(status().isOk());

    }

    @Test
    public void addAQuestion() throws Exception{

    	question.setContent("Question Content");
    	question.setType("Question Type");

    	question = questionRepository.save(question);

    	MockHttpServletRequestBuilder patchBuilder = patch("/rest/questions/" + question.getId())
    		.contentType(contentType)
    		.content(createQuestionInJson("Question Content Updated","Question Type Updated"));
    	
    	mockMvc.perform(patchBuilder)
    		.andExpect(status().isOk());
    }
    @Test
    public void addAQuestionReturnsOKStatus() throws Exception {

    		question.setContent("Question Content");
    		question.setType("Question Type");
        MockHttpServletRequestBuilder postBuilder = post("/rest/questions/")
                .contentType(contentType)
                .content(createQuestionInJson("Question Type", "Question Content"));
        mockMvc.perform(postBuilder)
                .andExpect(status().isOk());
     }




    @Test
    public void nullQuestionShouldThrowException(){
        MockHttpServletRequestBuilder patchBuilder = patch("/rest/questions/" + 7)
                .contentType(contentType)
                .content(createQuestionInJson("Question Content Updated", "Question Type Updated"));
                
        try{
            mockMvc.perform(patchBuilder);
            fail("Did not throw exception");
        }catch (Exception exception){
            Assert.assertNotNull(exception);
            assertTrue(exception instanceof NestedServletException);
        }
    }

    @Test
    public void deleteAQuestion(){
    	question.setContent("Question Content");
    	question.setType("Question Type");
    	question = questionRepository.save(question);

    	MockHttpServletRequestBuilder deleteBuilder = delete("/rest/questions/" + question.getId());
    	try{
            mockMvc.perform(deleteBuilder)
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(contentType));

        }catch (Exception exception){
            fail("Exception has been thrown");
        }
    }

    @Test
    public void deletingANonExistingQuestionThrowException(){
        MockHttpServletRequestBuilder deleteBuilder = delete("/rest/questions/" + 23);

        try {
            mockMvc.perform(deleteBuilder);
            fail("Exception not thrown");
        }catch (Exception exception){
            assertNotNull(exception);
        }
    }
    


   
     private static String createQuestionInJson (String questionType, String question){
        return "{\"type\": \"" + questionType + "\", \"content\":\"" + question + "\"}";
    }


}