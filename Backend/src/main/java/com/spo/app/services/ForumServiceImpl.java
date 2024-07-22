package com.spo.app.services;

import com.spo.app.dao.ForumRepository;
import com.spo.app.entity.Forum;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;
import java.util.List;
@Service
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class ForumServiceImpl implements IForumService{

    private ForumRepository forumRepository;


    @Override
    public List<Forum> retrieveMessages(String senderId, String receiverId) {
        return forumRepository.findBySenderIdAndReceiverIdOrderByDateAsc(senderId, receiverId);
    }

    @Override
    public Forum addForum(Forum forum) {
        forum.setDate(LocalDateTime.now());
        return forumRepository.save(forum);
    }

    @Override
    public Forum updateForum(Forum forum) {
        return forumRepository.save(forum);
    }

    @Override
    public void deleteForum(String  id) {
        forumRepository.deleteById(id);
    }

    @Override
    public Forum retrieveForum(String  Forumid) {
        return forumRepository.findById(Forumid).get();
    }

    @Override
    public List<Forum> retrieveAllForums() {
        return forumRepository.findAll();
    }


}
