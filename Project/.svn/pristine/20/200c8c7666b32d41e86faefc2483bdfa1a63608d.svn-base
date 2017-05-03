package hello.repositories;

import hello.models.Question;
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

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DirtiesContext
public class QuestionRepositoryTests{

    @Autowired
    private QuestionRepository questionRepository;

    @MockBean
    private StorageService storageService;

    @Test
    public void testQuestionRepository() {
        Question question = new Question();
        question.setId(1);
        question.setType("Text");
        question.setContent("Question: Test question");
        question.setStatus("answered");
        question.setHasHint(true);
        question.setHint("this is a hint");
        questionRepository.save(question);

        assertEquals(1, questionRepository.count());
        assertEquals(question.getType(), "Text");
        assertEquals(question.getContent(), "Question: Test question");
    }

}
