package com.spo.app.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.CrossOrigin;




@Getter
@Setter
@Document
@CrossOrigin(origins = "*")
public class Creategame {
    @Id
    private String id;

    private String room_name;


    public Creategame(String id, String room_name, VoteType votetype) {
        this.id = id;
        this.room_name = room_name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRoom_name() {
        return room_name;
    }

    public void setRoom_name(String room_name) {
        this.room_name = room_name;
    }



    @Override
    public String toString() {
        return "Creategame{" +
                "id=" + id +
                ", room_name='" + room_name + '\'' +

                '}';
    }

    public Creategame() {
    }
}
