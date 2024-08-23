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
@Document(collection = "WhatTuto")
public class WhatTuto {

    @Id
    private String id;

    @Field(name = "WhatDescription", targetType = FieldType.STRING)
    private String WhatDescription;

    public WhatTuto(String id, String whatDescription) {
        this.id = id;
        WhatDescription = whatDescription;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setWhatDescription(String whatDescription) {
        WhatDescription = whatDescription;
    }

    public WhatTuto() {
    }

    @Override
    public String toString() {
        return "WhatTuto{" +
                "id='" + id + '\'' +
                ", WhatDescription='" + WhatDescription + '\'' +
                '}';
    }
}
