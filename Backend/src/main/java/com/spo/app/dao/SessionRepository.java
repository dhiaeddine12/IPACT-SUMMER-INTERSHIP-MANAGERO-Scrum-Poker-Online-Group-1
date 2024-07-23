package com.spo.app.dao;
<<<<<<< HEAD
=======
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
>>>>>>> 9a0e8d7cd80e12fd230a4077d9e5fb9446455c9a
import com.spo.app.entity.Session;
import com.spo.app.entity.Test;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends MongoRepository<Session,String> {
}
