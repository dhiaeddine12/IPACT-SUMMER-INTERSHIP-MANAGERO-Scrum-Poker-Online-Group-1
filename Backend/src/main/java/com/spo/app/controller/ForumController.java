package com.spo.app.controller;

import com.spo.app.entity.Forum;
import com.spo.app.entity.Vote;
import com.spo.app.services.ForumServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Tag(name = "Web Services pour forum ")
@CrossOrigin(origins = "*")
@AllArgsConstructor
@RequestMapping("/forum")
@RestController
public class ForumController {


    ForumServiceImpl forumService;


    @PostMapping("/add_forum")
    public Forum addForum(@RequestBody Forum forum) {
        forum.setDate(LocalDateTime.now());
        return forumService.addForum(forum);
    }

    @PutMapping("/modify-forum")
    public Forum updateForum(@RequestBody Forum forum) {
        return forumService.updateForum(forum);
    }

    @DeleteMapping("/remove-forum/{forum-id}")
    public void deleteForum(@PathVariable("forum-id")
                                String  ForumId) {
        forumService.deleteForum(ForumId);
    }

    @Operation(description = "Return an forum!")
    @GetMapping("/retrieve-forum/{forum-id}")
    public Forum getForum(@PathVariable("forum-id") String  ForumId) {
        return forumService.retrieveForum(ForumId);
    }

    @GetMapping("/retrieve-all-forums")
    public List<Forum> getForums() {
        return forumService.retrieveAllForums();
    }


    @GetMapping("/retrieve")
    public List<Forum> retrieveMessages(
            @RequestParam String senderId,
            @RequestParam String receiverId
    ) {
        return forumService.retrieveMessages(senderId, receiverId);
    }






















}
