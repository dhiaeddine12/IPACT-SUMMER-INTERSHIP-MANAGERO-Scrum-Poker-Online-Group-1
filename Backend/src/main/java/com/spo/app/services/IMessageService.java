package com.spo.app.services;

import com.spo.app.entity.Message;
import com.spo.app.entity.User;

public interface IMessageService {

    Message saveMessage(String sender, String content);


}
