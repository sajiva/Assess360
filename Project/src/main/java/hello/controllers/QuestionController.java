package hello.controllers;

import hello.helpers.PatchClasses;
import hello.repositories.exceptions.QuestionNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import hello.models.*;
import hello.repositories.*;

import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.util.ArrayList;
import java.util.List;

@RestController
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;


    @RequestMapping(value = "/rest/questions", method=RequestMethod.GET)
    public ArrayList<Question> getQuestions(){
        ArrayList<Question> questionList = new ArrayList<Question>();
        for (Question question :
                questionRepository.findAll()) {
            questionList.add(question);
        }
        return questionList;
    }

    /**
     * Adds a question
     * @param question
     * @return
     */
    @RequestMapping(value = "/rest/questions", method=RequestMethod.POST)
    public ResponseEntity<Question> addQuestion(@RequestBody Question question){
        questionRepository.save(question);

        return new ResponseEntity<Question>(questionRepository.findOne((int)questionRepository.count()), HttpStatus.OK);
    }

    /**
     localhost:8080/rest/questions/{id}/
     Gets A Question
     */
    @RequestMapping(value = "/rest/questions/{id}/", method=RequestMethod.GET)
    public ResponseEntity<Question> getAQuestion(@PathVariable("id") int id){
        Question question = questionRepository.findOne(id);
        return new ResponseEntity<Question>(question, HttpStatus.OK);
    }

    /**
     * Update Question
     * @param id
     * @return
     */
    @RequestMapping(value = "/rest/questions/{id}", method=RequestMethod.PATCH)
    public ResponseEntity<Question> updateQuestion(@PathVariable("id") int id, @RequestBody Question question) throws Exception {

        //Grab Question that we will be updating
        Question questionUpdating = questionRepository.findOne(id);

        if(questionUpdating==null){
            throw new Exception("Question "+id+" not found");
        }

        PatchClasses.PerformAPatch(questionUpdating,question);

        /*******************************************************************/
        return new ResponseEntity<Question>(questionUpdating, HttpStatus.OK);
    }

    //Deletes a question
    @RequestMapping(value = "/rest/questions/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteQuestion(@PathVariable("id") int id){
        Question question = questionRepository.findOne(id);
        if(question != null){
            questionRepository.delete(question);
            return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
        }else{
            throw new QuestionNotFoundException(id);
        }
    }
}
