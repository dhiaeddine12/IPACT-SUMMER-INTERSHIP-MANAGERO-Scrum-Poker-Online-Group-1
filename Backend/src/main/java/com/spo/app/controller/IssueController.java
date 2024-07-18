package com.spo.app.controller;


import com.spo.app.dao.IssueRepo;

import com.spo.app.dao.ProjectRepo;
import com.spo.app.entity.Issue;
import com.spo.app.entity.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:4200")
public class IssueController {

    @Autowired
    private IssueRepo issueRepo;

    @Autowired
    private ProjectRepo projectRepo;


    @PostMapping("/create-issue")
    public ResponseEntity<Issue> createIssue(@RequestBody Issue issueRequest) {
        Project project = projectRepo.findById(issueRequest.getProject()).orElse(null);

        if (project != null) {
            Issue issue = new Issue();
            issue.setTitle(issueRequest.getTitle());
            issue.setDescription(issueRequest.getDescription());
            issue.setStatus(issueRequest.getStatus());
            issue.setDateReported(new Date());
            issue.setProject(project.getId()); // Set the project ID in Issue

            Issue savedIssue = issueRepo.save(issue);

            // Update the project's list of issue IDs
            project.getIssueIds().add(savedIssue.getId());
            projectRepo.save(project);

            return ResponseEntity.ok(savedIssue);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssueById(@PathVariable String id) {
        Optional<Issue> issueOptional = issueRepo.findById(id);

        if (issueOptional.isPresent()) {
            return ResponseEntity.ok(issueOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/update-issue/{id}")
    public ResponseEntity<Issue> updateIssue(@PathVariable String id, @RequestBody Issue updatedIssue) {
        Issue issue = issueRepo.findById(id).orElse(null);
        if (issue != null) {
            // Update fields
            issue.setTitle(updatedIssue.getTitle());
            issue.setDescription(updatedIssue.getDescription());
            issue.setStatus(updatedIssue.getStatus());

            // Save updated issue
            Issue savedIssue = issueRepo.save(issue);
            return new ResponseEntity<>(savedIssue, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping
    public List<Issue> getAllIssues() {
        return issueRepo.findAll();
    }
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Issue>> getIssuesByProjectId(@PathVariable String projectId) {
        Optional<Project> projectOptional = projectRepo.findById(projectId);

        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();
            List<Issue> issues = issueRepo.findByProject(project);
            return ResponseEntity.ok(issues);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
