package com.spo.app.dao;
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
import com.spo.app.entity.Session;
import com.spo.app.entity.Test;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends MongoRepository<Session,String> {
}
