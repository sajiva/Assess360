package hello.repositories;

/**
 * Created by Hector on 1/28/2017.
 */
import hello.models.Question;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;


// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete
@RepositoryRestResource(collectionResourceRel = "questions", path = "questions")
public interface QuestionRepository extends PagingAndSortingRepository<Question, Integer> {
    /**
     * /rest/questions/search?type={type}
     */
    List<Question> findByType(@Param("type") String type);

    /**
     *
     * @param content
     * @return
     */
    List<Question> findByContent(@Param("content") String content);

    /**
     * /rest/questions/search?%type={type}%
     * @param type
     * @param content
     * @return
     */
    List<Question> findByTypeAndContent(@Param("type") String type, @Param("content") String content);

}
