package com.spo.app.dao;

import com.spo.app.entity.Session;
import com.spo.app.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository  extends MongoRepository<User,String> {
    User findByEmail(String email);
}
