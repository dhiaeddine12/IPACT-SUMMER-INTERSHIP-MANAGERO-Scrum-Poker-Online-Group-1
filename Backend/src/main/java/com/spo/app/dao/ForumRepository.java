package com.spo.app.dao;

import com.spo.app.entity.Forum;
import com.spo.app.entity.Vote;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
@CrossOrigin(origins = "*")
public interface ForumRepository extends MongoRepository <Forum, String > {

    List<Forum> findBySenderIdAndReceiverIdOrderByDateAsc(String senderId, String receiverId);
}
