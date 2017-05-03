package hello.repositories;

import hello.models.Participant;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "participants", path = "participants")
public interface ParticipantRepository extends PagingAndSortingRepository<Participant, Integer> {

}

