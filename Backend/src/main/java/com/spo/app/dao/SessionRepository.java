package com.spo.app.dao;

import com.spo.app.entity.Session;
import com.spo.app.entity.Test;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SessionRepository extends MongoRepository<Session,String> {
    Optional<Session> findByToken(String token);
}
