package com.spo.app.dao;

import com.spo.app.entity.How;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HowRepo extends MongoRepository<How,String> {
}
