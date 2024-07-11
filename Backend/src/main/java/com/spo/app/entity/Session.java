package com.spo.app.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private Date start_date;
    @Field
    private Date end_date ;

    @DBRef
    private List<User> userList;




}
