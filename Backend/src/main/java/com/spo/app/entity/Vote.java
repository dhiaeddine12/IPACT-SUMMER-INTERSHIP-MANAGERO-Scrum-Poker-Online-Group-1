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
@Document
public class Vote {


    @Id
    private String  id;
    private Long estimation;

    public void setId(String  id) {
        this.id = id;
    }

    public void setEstimation(Long estimation) {
        this.estimation = estimation;
    }

    public Vote() {
    }

    @Override
    public String toString() {
        return "Vote{" +
                "id=" + id +
                ", estimation=" + estimation +
                '}';
    }
}
