package hello.repositories;

import hello.models.Assessment;
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

import java.util.*;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DirtiesContext
public class AssessmentRepositoryTest {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @MockBean
    private StorageService storageService;

    @Test
    public void testAssessmentRepository() {
        Date createdAt = new Date(11111111);
        Date expirationDate = new Date(22222222);

        Assessment assessment = new Assessment();
        assessment.setId(1);
        assessment.setName("assessment 1");
        assessment.setSubtitle("subtitle");
        assessment.setExpirationDate(expirationDate);
        assessment.setAllowed_time_sec(7200);
        assessment.setCreatedAt(createdAt);

        assessmentRepository.save(assessment);

        assertEquals(1, assessmentRepository.count());
        assertTrue(assessment.getId().equals(1));
        assertEquals("assessment 1", assessment.getName());
        assertEquals("subtitle", assessment.getSubtitle());
        assertEquals(createdAt, assessment.getCreatedAt());
        assertEquals(expirationDate, assessment.getExpirationDate());
    }

    @Test
    public void testAssessmentExpirationAndCreatedDate() {
        Assessment assessment = new Assessment();
        assessment.setExpirationDate(null);
        assessment.setCreatedAt(null);

        assertEquals(new Date(), assessment.getCreatedAt());
        assertEquals(new Date(), assessment.getExpirationDate());
    }

    @Test
    public void testAssessmentQuestions() {
        Assessment assessment = new Assessment();
        assessment.setId(1);
        Question question = new Question();
        question.setId(1);
        Set<Question> questions = new HashSet<Question>();
        questions.add(question);
        assessment.setQuestionSet(questions);

        assertEquals(questions, assessment.getQuestionSet());
    }

}