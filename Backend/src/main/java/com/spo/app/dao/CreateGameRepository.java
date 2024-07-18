package com.spo.app.dao;

import com.spo.app.entity.Creategame;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin(origins = "*")
public interface CreateGameRepository extends MongoRepository<Creategame, String > {
}
