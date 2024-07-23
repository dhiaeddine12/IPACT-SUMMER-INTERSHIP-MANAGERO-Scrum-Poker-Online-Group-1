package com.spo.app.entity;
<<<<<<< HEAD
=======
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
>>>>>>> 9a0e8d7cd80e12fd230a4077d9e5fb9446455c9a
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
    private String name;
    @Field
    private Date start_date;
    @Field
    private Date end_date ;

    @DBRef
    private List<User> userList;



<<<<<<< HEAD

=======
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
>>>>>>> 9a0e8d7cd80e12fd230a4077d9e5fb9446455c9a
}
