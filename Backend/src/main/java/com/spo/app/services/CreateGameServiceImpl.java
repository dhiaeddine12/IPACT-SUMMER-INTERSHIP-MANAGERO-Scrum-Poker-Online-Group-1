package com.spo.app.services;

import com.spo.app.dao.CreateGameRepository;
import com.spo.app.entity.Creategame;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
@Service
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class CreateGameServiceImpl implements ICreateGameService {

    private CreateGameRepository createGameRepository ;
    @Override
    public Creategame addCreategame(Creategame creategame) {
        return createGameRepository.save(creategame);
    }

    @Override
    public Creategame updateCreategame(Creategame creategame) {
        return createGameRepository.save(creategame);
    }

    @Override
    public void deleteCreategame(String  id) {
        createGameRepository.deleteById(id);
    }

    @Override
    public Creategame retrieveCreategame(String  CreategameId) {
        return createGameRepository.findById(CreategameId).get();
    }

    @Override
    public List<Creategame> retrieveAllCreategames() {
        return createGameRepository.findAll();
    }
}
