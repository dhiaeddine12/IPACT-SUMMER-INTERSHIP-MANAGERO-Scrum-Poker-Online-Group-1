package com.spo.app.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.util.Date;
import java.util.List;

@Document(collection = "problematics")
public class Problematic {

    @Id
    private String id;

    @Field(name = "name", targetType = FieldType.STRING)
    private String name;
    @Field(name = "description", targetType = FieldType.STRING)
    private String description;

    @Field(name = "project")
    private Project project;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    @Override
    public String toString() {
        return "Problematic{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }

    public Problematic() {
    }
}