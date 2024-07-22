package com.spo.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mongodb.lang.Nullable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Document(collection = "projects")
public class Project {

    @Id
    private String id;

    @Field(name = "title", targetType = FieldType.STRING)
    private String title;

    @Field(name = "problematics", targetType = FieldType.ARRAY)
    private List<Problematic> problematics;

    @Field(name = "description", targetType = FieldType.STRING)
    private String description;

    @Field(name = "issueIds", targetType = FieldType.ARRAY)
    private List<String> issueIds = new ArrayList<>(); // Store issue IDs as String


    public List<String> getIssueIds() {
        return issueIds;
    }

    public void setIssueIds(List<String> issueIds) {
        this.issueIds = issueIds;
    }

    @Field(name = "status", targetType = FieldType.STRING)
    private Status status;

    @Field(name = "statementOfWork", targetType = FieldType.STRING)
    private String statementOfWork;

    @Field(name = "dateSubmitted", targetType = FieldType.DATE_TIME)
    private Date dateSubmitted;


    @Field(name = "archived", targetType = FieldType.BOOLEAN)
    private boolean archived;

    public Project() {
    }

    @Override
    public String toString() {
        return "Project{" +
                "title='" + title + '\'' +
                ", problematics=" + problematics +
                ", description='" + description + '\'' +
                ", status=" + status +
                ", statementOfWork='" + statementOfWork + '\'' +
                ", dateSubmitted=" + dateSubmitted +

                ", archived=" + archived +
                '}';
    }

    public String getId() {
        return id;
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

    public List<Problematic> getProblematics() {
        return problematics;
    }

    public void setProblematics(List<Problematic> problematics) {
        this.problematics = problematics;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getStatementOfWork() {
        return statementOfWork;
    }

    public void setStatementOfWork(String statementOfWork) {
        this.statementOfWork = statementOfWork;
    }

    public Date getDateSubmitted() {
        return dateSubmitted;
    }

    public void setDateSubmitted(Date dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
    }



    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }
}
