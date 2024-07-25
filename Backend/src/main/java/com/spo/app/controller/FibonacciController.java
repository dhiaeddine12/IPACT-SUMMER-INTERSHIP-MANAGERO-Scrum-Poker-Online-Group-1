package com.spo.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class FibonacciController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/click")
    public void handleClick(int value) {
        // Broadcast the clicked value to all subscribers
        messagingTemplate.convertAndSend("/topic/lastClicked", value);
    }

    @MessageMapping("/validate")
    public void handleValidation(int value) {
        // Broadcast the validated value to all subscribers
        messagingTemplate.convertAndSend("/topic/validatedChoice", value);
    }

}
