package com.spo.app.dao;

import com.spo.app.entity.Project;
import com.spo.app.entity.Status;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface ProjectRepo  extends MongoRepository<Project,String> {

    Long countByStatus(Status status);

    Long countByArchived(boolean archived);
}
