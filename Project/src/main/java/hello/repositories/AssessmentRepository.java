package hello.repositories;

import hello.models.Assessment;
import hello.models.TargetGroup;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "assessments", path = "assessments")
public interface AssessmentRepository extends PagingAndSortingRepository<Assessment, Integer>
{
    /**
     * /rest/questions/search?type={type}
     */
    @Query("SELECT S1 FROM Assessment AS S1 JOIN S1.usersSet AS S2 WHERE  S2.username=:UserID")
    Iterable<Assessment> findForUser( @Param("UserID") String UserID );

    List<Assessment> findByTargetGroup(TargetGroup targetGroup);

}
