package com.spo.app;

import com.spo.app.controller.IssueController;
import com.spo.app.dao.IssueRepo;
import com.spo.app.dao.ProjectRepo;
import com.spo.app.entity.Issue;
import com.spo.app.entity.Project;
import com.spo.app.entity.StatusI;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.bson.assertions.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;

@SpringJUnitConfig
public class IssueControllerTest {

    @InjectMocks
    private IssueController issueController;

    @Mock
    private IssueRepo issueRepo;

    @Mock
    private ProjectRepo projectRepo;

    private Issue issue;
    private Project project;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialiser les objets de test
        issue = new Issue();
        issue.setId("1");
        issue.setTitle("Test Issue");
        issue.setDescription("Description of test issue");
        issue.setStatus(StatusI.COMPLETED);
        issue.setDateReported(new Date());

        project = new Project();
        project.setId("project1");
        project.setIssueIds(new ArrayList<>());
    }

    @Test
    public void testCreateIssueSuccess() {
        // Simulation du projet trouvé
        when(projectRepo.findById("project1")).thenReturn(Optional.of(project));
        // Simulation de la sauvegarde de l'issue
        when(issueRepo.save(any(Issue.class))).thenReturn(issue);

        // Création de l'issue avec la même ID de projet
        issue.setProject("project1");

        ResponseEntity<Issue> response = issueController.createIssue(issue);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(issue);
        verify(issueRepo, times(1)).save(any(Issue.class));
        verify(projectRepo, times(1)).save(any(Project.class));
    }


    @Test
    public void testCreateIssueProjectNotFound() {
        when(projectRepo.findById("project1")).thenReturn(Optional.empty());

        ResponseEntity<Issue> response = issueController.createIssue(issue);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        verify(issueRepo, never()).save(any(Issue.class));
    }

    @Test
    public void testGetIssueByIdSuccess() {
        when(issueRepo.findById("1")).thenReturn(Optional.of(issue));

        ResponseEntity<Issue> response = issueController.getIssueById("1");

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(issue);
    }

    @Test
    public void testGetIssueByIdNotFound() {
        when(issueRepo.findById("1")).thenReturn(Optional.empty());

        ResponseEntity<Issue> response = issueController.getIssueById("1");

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    public void testUpdateIssueSuccess() {
        // Préparer l'entité Issue avec des données initiales
        Issue existingIssue = new Issue();
        existingIssue.setId("1");
        existingIssue.setTitle("Old Title");
        existingIssue.setDescription("Old Description");
        existingIssue.setStatus(StatusI.COMPLETED);

        // Préparer l'entité Issue mise à jour
        Issue updatedIssue = new Issue();
        updatedIssue.setTitle("New Title");
        updatedIssue.setDescription("New Description");
        updatedIssue.setStatus(StatusI.COMPLETED);

        // Simuler le comportement de findById et save
        when(issueRepo.findById("1")).thenReturn(Optional.of(existingIssue));
        when(issueRepo.save(any(Issue.class))).thenReturn(updatedIssue);

        // Appeler la méthode updateIssue
        ResponseEntity<Issue> response = issueController.updateIssue("1", updatedIssue);

        // Vérifier la réponse
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
      //  assertEquals("Closed", response.getBody().getStatus());
    }


    @Test
    public void testUpdateIssueNotFound() {
        when(issueRepo.findById("1")).thenReturn(Optional.empty());

        Issue updatedIssue = new Issue();
        updatedIssue.setTitle("Updated Title");
        updatedIssue.setDescription("Updated Description");
        issue.setStatus(StatusI.COMPLETED);

        ResponseEntity<Issue> response = issueController.updateIssue("1", updatedIssue);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    public void testGetAllIssues() {
        List<Issue> issues = List.of(issue);
        when(issueRepo.findAll()).thenReturn(issues);

        List<Issue> result = issueController.getAllIssues();

        assertThat(result).hasSize(1);
        assertThat(result.get(0)).isEqualTo(issue);
    }

    @Test
    public void testGetIssuesByProjectIdSuccess() {
        when(projectRepo.findById("project1")).thenReturn(Optional.of(project));
        when(issueRepo.findByProject(project)).thenReturn(List.of(issue));

        ResponseEntity<List<Issue>> response = issueController.getIssuesByProjectId("project1");

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).hasSize(1);
        assertThat(response.getBody().get(0)).isEqualTo(issue);
    }

    @Test
    public void testGetIssuesByProjectIdNotFound() {
        when(projectRepo.findById("project1")).thenReturn(Optional.empty());

        ResponseEntity<List<Issue>> response = issueController.getIssuesByProjectId("project1");

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }
}
