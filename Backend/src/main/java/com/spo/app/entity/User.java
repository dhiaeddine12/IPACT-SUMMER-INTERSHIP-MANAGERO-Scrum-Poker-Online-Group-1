package com.spo.app.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.util.Date;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter

@Document(collection = "User")
public class User {
        @Id
        private ObjectId id;

        @Field
        private String email;

        @Field
        private String resetPassword;

        @Field
        private String matriculate;

        @Field
        private List<ObjectId> roles;

        @Field
        private int failedAttempts;

        @Field
        private String answer1;

        @Field
        private String answer2;

        @Field
        private String answer3;

        @Field
        private boolean nonLocked;

        @Field
        private boolean archiver;

        @Field
        private boolean accountEnabled;

        @Field
        private String codeVerification;

        @Field
        private String codeExpiryDate;

        @Field
        private String password;

        @Field
        private String username;

        @Field
        private List<String> authorities;

        @Field
        private boolean accountNonExpired;

        @Field
        private boolean accountNonLocked;

        @Field
        private boolean credentialsNonExpired;

        @Field
        private boolean enabled;

    }
