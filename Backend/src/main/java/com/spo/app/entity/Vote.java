package com.spo.app.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;


@Getter
@CrossOrigin(origins = "*")
@AllArgsConstructor
@Setter
@Document(collection = "votes")
public class Vote {
    @Id
    private String id;
    private String sessionId;
    private String userId;
    private int value;
}
