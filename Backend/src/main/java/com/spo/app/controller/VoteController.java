package com.spo.app.controller;

import com.spo.app.entity.Vote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VoteController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/app/lastClickedValue")
    public ResponseEntity<Void> sendLastClickedValue(@RequestBody Integer value) {
        messagingTemplate.convertAndSend("/topic/lastClickedValue", value);
        return ResponseEntity.ok().build();}
}
