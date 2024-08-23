package com.spo.app.controller;

import com.spo.app.entity.Message;
import com.spo.app.services.MessageServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
@Tag(name = "Web Services pour chat")
@CrossOrigin(origins = "*")
@AllArgsConstructor
@RequestMapping("/chat")
@RestController
public class ChatController {

    private MessageServiceImpl messageService;


    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public Message sendMessage(String content) {
        return messageService.saveMessage("user1", content);
    }



}
