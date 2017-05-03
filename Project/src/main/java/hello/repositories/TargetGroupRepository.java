package hello.repositories;

import hello.models.TargetGroup;
import hello.models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "targetGroups", path = "targetGroups")
public interface TargetGroupRepository extends PagingAndSortingRepository<TargetGroup, Integer>
{

    @Query("SELECT S1 FROM TargetGroup AS S1 JOIN S1.usersSet AS S2 WHERE S2=:User")
    Iterable<TargetGroup> findAll(@Param("User") User user);
}
