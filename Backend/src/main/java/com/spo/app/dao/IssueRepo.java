package com.spo.app.dao;

import com.spo.app.entity.Issue;
import com.spo.app.entity.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepo extends MongoRepository<Issue,String> {
    List<Issue> findByProject(Project project);
    Issue findByTitle(String title);
}
