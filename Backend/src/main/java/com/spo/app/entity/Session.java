package com.spo.app.entity;

import lombok.*;
import org.antlr.v4.runtime.Token;
import org.springframework.context.annotation.Bean;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Document
@ToString
@Getter
@Setter
public class Session {

    @Id
    private String id;
    @Field
    private String name;
    @Field
    private Date start_date;
    @Field
    private Date end_date;

    @DBRef
    private List<User> userList;


    @Field
    private  String Token;


    @DBRef
    private List<Issue> issueList;
}

