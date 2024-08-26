package com.spo.app.services;

import com.spo.app.entity.Creategame;
import com.spo.app.entity.Forum;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "*")
public interface IForumService {

    List<Forum> retrieveMessages(String senderId, String receiverId);
    public Forum addForum (Forum forum);

    public Forum updateForum(Forum forum);

    void deleteForum(String  id);

    public Forum retrieveForum(String  Forumid);
    List<Forum> retrieveAllForums();


}
