package com.spo.app.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.web.bind.annotation.CrossOrigin;

@Getter
@CrossOrigin(origins = "*")


@Setter
@Document(collection = "WhyTuto")
public class WhyTuto {

    @Id
    private String id;
    @Field(name = "WhyTitle", targetType = FieldType.STRING)
    private String WhyTitle;
    @Field(name = "WhyDescription", targetType = FieldType.STRING)
    private String WhyDescription;

    public WhyTuto(String id, String whyTitle, String whyDescription) {
        this.id = id;
        WhyTitle = whyTitle;
        WhyDescription = whyDescription;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWhyTitle() {
        return WhyTitle;
    }

    public void setWhyTitle(String whyTitle) {
        WhyTitle = whyTitle;
    }

    public String getWhyDescription() {
        return WhyDescription;
    }

    public void setWhyDescription(String whyDescription) {
        WhyDescription = whyDescription;
    }

    public WhyTuto() {
    }

    @Override
    public String toString() {
        return "WhyTuto{" +
                "id='" + id + '\'' +
                ", WhyTitle='" + WhyTitle + '\'' +
                ", WhyDescription='" + WhyDescription + '\'' +
                '}';
    }
}
