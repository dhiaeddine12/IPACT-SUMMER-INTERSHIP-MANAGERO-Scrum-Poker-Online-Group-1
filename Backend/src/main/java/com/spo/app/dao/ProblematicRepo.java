package com.spo.app.dao;
import com.spo.app.entity.Problematic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblematicRepo  extends MongoRepository<Problematic,String> {
}
