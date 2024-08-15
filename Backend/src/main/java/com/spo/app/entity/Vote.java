package com.spo.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@Getter

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Document(collection = "votes")
public class Vote {
    @Id
    private String id;
    private int value;

    private Session session;

    private Issue issue;
    private User user;

}
