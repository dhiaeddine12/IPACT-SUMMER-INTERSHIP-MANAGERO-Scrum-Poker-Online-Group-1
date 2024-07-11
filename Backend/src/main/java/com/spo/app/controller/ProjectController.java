package com.spo.app.controller;

import com.spo.app.dao.IssueRepo;
import com.spo.app.dao.ProjectRepo;
import com.spo.app.entity.Issue;
import com.spo.app.entity.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectController {

    @Autowired
    private ProjectRepo projectRepository;
    @Autowired
    private IssueRepo issueRepo;

    // Get all projects
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    // Create a new project
    @PostMapping("/add")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        // Ensure the list of issueIds is initially empty
        project.setIssueIds(new ArrayList<>());

        // Set default values for the additional fields
        if (project.getProblematics() == null) {
            project.setProblematics(new ArrayList<>());
        }
        if (project.getStatementOfWork() == null) {
            project.setStatementOfWork("Define the scope of work");
        }
        project.setDateSubmitted(Date.from(Instant.now()));
        project.setArchived(false);

        Project savedProject = projectRepository.save(project);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }


    // Get project by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable String id) {
        Project project = projectRepository.findById(id).orElse(null);
        if (project != null) {
            return new ResponseEntity<>(project, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    // Update project
    @PutMapping("/updatep/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable String id, @RequestBody Project updatedProject) {
        Project project = projectRepository.findById(id).orElse(null);
        if (project != null) {
            // Update fields
            project.setTitle(updatedProject.getTitle());
            project.setDescription(updatedProject.getDescription());
            project.setStatus(updatedProject.getStatus());

            // Save updated project
            Project savedProject = projectRepository.save(project);
            return new ResponseEntity<>(savedProject, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to delete an issue from a project
    @DeleteMapping("/{projectId}/{issueId}")
    public ResponseEntity<Project> deleteIssueFromProject(@PathVariable String projectId, @PathVariable String issueId) {
        Optional<Project> optionalProject = projectRepository.findById(projectId);
        if (optionalProject.isPresent()) {
            Project project = optionalProject.get();

            // Remove issueId from the list
            List<String> issueIds = project.getIssueIds();
            issueIds.remove(issueId); // Remove the specific issueId

            // Update the project in the repository
            projectRepository.save(project);

            return ResponseEntity.ok(project);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete project by ID
    @DeleteMapping("/deletep/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable String id) {
        Project project = projectRepository.findById(id).orElse(null);
        if (project != null) {
            projectRepository.delete(project);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{projectId}/issues")
    public ResponseEntity<List<Issue>> getAllIssuesByProjectId(@PathVariable String projectId) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);

        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();
            List<String> issueIds = project.getIssueIds();

            // Fetch all issues based on their IDs
            List<Issue> issues = issueRepo.findAllById(issueIds);

            return ResponseEntity.ok(issues);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
