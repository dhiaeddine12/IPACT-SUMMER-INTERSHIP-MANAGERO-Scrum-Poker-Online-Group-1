package com.spo.app.dao;

import com.spo.app.entity.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepo  extends MongoRepository<Project,String> {
}
