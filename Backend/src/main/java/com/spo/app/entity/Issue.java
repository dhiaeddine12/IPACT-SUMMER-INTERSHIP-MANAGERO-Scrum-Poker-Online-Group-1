package com.spo.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.util.Date;

@ToString
@Document(collection = "issues")
public class Issue {


    @Id
    private String id;

    @Field(name = "title", targetType = FieldType.STRING)
    private String title;

    @Field(name = "description", targetType = FieldType.STRING)
    private String description;

    @Field(name = "status", targetType = FieldType.STRING)
    private StatusI status;

    @Field(name = "dateReported", targetType = FieldType.DATE_TIME)
    private Date dateReported;



    @Field(name = "project", targetType = FieldType.OBJECT_ID)
    private String project;

    private double averageVote;

    public String getId() {
        return id;
    }

    public double getAverageVote() {
        return averageVote;
    }
    public void setAverageVote(double averageVote) {
        this.averageVote = averageVote;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public StatusI getStatus() {
        return status;
    }

    public void setStatus(StatusI status) {
        this.status = status;
    }

    public Date getDateReported() {
        return dateReported;
    }

    public void setDateReported(Date dateReported) {
        this.dateReported = dateReported;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public Issue() {
    }

    @Override
    public String toString() {
        return "Issue{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", status=" + status +
                ", dateReported=" + dateReported +
                ", project=" + project +
                '}';
    }
}
