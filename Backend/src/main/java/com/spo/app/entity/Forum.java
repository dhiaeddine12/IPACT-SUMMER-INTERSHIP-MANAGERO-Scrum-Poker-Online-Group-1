package com.spo.app.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import org.springframework.data.annotation.Id;
import java.time.LocalDateTime;
@Getter
@CrossOrigin(origins = "*")


@Setter
@Document(collection = "forum_messages")
public class Forum {

    @Id
    private String  id;
    private String user;
    private String content;
    private LocalDateTime date;
    private String senderId; // User ID of the sender
    private String receiverId; // User ID of the receiver

    public Forum(String id, String content, LocalDateTime date, String senderId, String receiverId) {
        this.id = id;
        this.content = content;
        this.date = date;
        this.senderId = senderId;
        this.receiverId = receiverId;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    @Override
    public String toString() {
        return "Forum{" +
                "id='" + id + '\'' +
                ", user='" + user + '\'' +
                ", content='" + content + '\'' +
                ", date=" + date +
                ", senderId='" + senderId + '\'' +
                ", receiverId='" + receiverId + '\'' +
                '}';
    }

    public Forum(String  id, String user, String content, LocalDateTime date) {
        this.id = id;
        this.user = user;
        this.content = content;
        this.date = date;
    }

    public Forum() {
    }

    public String getId() {
        return id;
    }

    public String getUser() {
        return user;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setId(String  id) {
        this.id = id;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

}
