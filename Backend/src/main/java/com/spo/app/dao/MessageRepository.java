package com.spo.app.dao;

import com.spo.app.entity.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String > {
}
