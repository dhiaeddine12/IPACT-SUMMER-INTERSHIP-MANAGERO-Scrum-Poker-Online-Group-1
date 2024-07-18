package com.spo.app.services;

import com.spo.app.dao.MessageRepository;
import com.spo.app.entity.Message;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class MessageServiceImpl implements IMessageService {
    private MessageRepository messageRepository;
    @Override
    public Message saveMessage(String sender, String content) {
        Message message = new Message();
        message.setSender(sender);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);
    }
}
