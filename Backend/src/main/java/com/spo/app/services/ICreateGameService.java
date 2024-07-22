package com.spo.app.services;

import com.spo.app.entity.Creategame;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
@CrossOrigin(origins = "*")
public interface ICreateGameService {

    public Creategame addCreategame (Creategame creategame);

    public Creategame updateCreategame (Creategame creategame);

    void deleteCreategame(String  id);

    public Creategame retrieveCreategame(String  CreategameId);
    List<Creategame> retrieveAllCreategames();
}
