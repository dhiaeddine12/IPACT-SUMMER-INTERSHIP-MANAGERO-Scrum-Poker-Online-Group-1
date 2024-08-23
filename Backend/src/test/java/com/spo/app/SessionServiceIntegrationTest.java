package com.spo.app;

import com.spo.app.dao.SessionRepository;
import com.spo.app.dao.UserRepository;
import com.spo.app.dao.IssueRepo;
import com.spo.app.dao.VoteRepository;
import com.spo.app.entity.Issue;
import com.spo.app.entity.Session;
import com.spo.app.entity.User;
import com.spo.app.entity.Vote;
import com.spo.app.services.SessionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test") // Utilisez un profil de test pour éviter les effets de bord avec la base de données de production
public class SessionServiceIntegrationTest {

    @Autowired
    private SessionService sessionService;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IssueRepo issueRepo;

    @Autowired
    private VoteRepository voteRepository;

    @BeforeEach
    public void setUp() {
        // Vous pouvez ajouter des configurations spécifiques aux tests si nécessaire
        sessionRepository.deleteAll(); // Assurez-vous que la base de données est vide avant chaque test
        userRepository.deleteAll();
        issueRepo.deleteAll();
        voteRepository.deleteAll();

            // Create and save a Session
            Session session = new Session();
            session.setToken("testSessionToken");
            session = sessionRepository.save(session);
            sessionId = session.getId();
            assertNotNull(sessionId, "Session ID should not be null");

            // Create and save an Issue
            Issue issue = new Issue();
            issue.setTitle("Test Issue");
            issue.setDescription("Description of the test issue");
            issue = issueRepo.save(issue);
            issueId = issue.getId();
            assertNotNull(issueId, "Issue ID should not be null");

    }

    @Test
    public void testAddSession() {
        Session session = new Session();
        session.setToken("testToken");
        Session result = sessionService.addSession(session);

        assertNotNull(result);
        assertTrue(sessionRepository.findById(result.getId()).isPresent());
    }


    @Test
    public void testGetSessionByToken() {
        // Créer et sauvegarder des issues
        Issue issue1 = new Issue();
        issue1.setTitle("Issue 1");
        issueRepo.save(issue1);

        Issue issue2 = new Issue();
        issue2.setTitle("Issue 2");
        issueRepo.save(issue2);

        // Créer et sauvegarder une session
        Session session = new Session();
        session.setToken("testToken");
        session.setIssueList(List.of(issue1, issue2));
        sessionRepository.save(session);

        // Récupérer les issues par token
        List<Issue> retrievedIssues = sessionService.GetsessionByToken("testToken");

        // Valider les résultats
        assertNotNull(retrievedIssues);
        assertEquals(2, retrievedIssues.size()); // Ajustez en fonction du nombre attendu
        assertTrue(retrievedIssues.stream().anyMatch(issue -> "Issue 1".equals(issue.getTitle())));
        assertTrue(retrievedIssues.stream().anyMatch(issue -> "Issue 2".equals(issue.getTitle())));
    }

    @Test
    public void testRetrieveOneSession() {
        Session session = new Session();
        session.setId("testId");
        sessionRepository.save(session);

        Session result = sessionService.retrieveoneSession("testId");

        assertNotNull(result);
        assertEquals("testId", result.getId());
    }

    @Test
    public void testInviteUsers() {
        // Créer et sauvegarder un utilisateur
        User user = new User();
        user.setEmail("user@example.com");
        userRepository.save(user);

        // Créer et sauvegarder une session
        Session session = new Session();
        session.setToken("testSessionToken");
        sessionRepository.save(session);

        // Appeler la méthode invite_users
        Session updatedSession = sessionService.invite_users("user@example.com", session.getId());

        // Récupérer la session mise à jour
        Session result = sessionRepository.findById(session.getId()).orElse(null);

        // Vérifications
        assertNotNull(result);
        assertEquals(1, result.getUserList().size());
        assertEquals(user.getEmail(), result.getUserList().get(0).getEmail());
        assertNotNull(result.getStart_date()); // Vérifier que la date de début est définie
        assertEquals(result.getStart_date().getTime(), updatedSession.getStart_date().getTime()); // Vérifier que la date de début est correcte
    }

    private String sessionId;
    private String issueId;
    @Test
    public void testAjouterIssues() {
        // Call the method to test
        Session updatedSession = sessionService.ajouterIssues(issueId, sessionId);

        // Retrieve the updated session
        Session retrievedSession = sessionRepository.findById(sessionId).orElse(null);

        // Assertions
        assertNotNull(retrievedSession, "Session should not be null");
        assertNotNull(retrievedSession.getIssueList(), "Issue list should not be null");
        assertTrue(retrievedSession.getIssueList().stream()
                .anyMatch(issue -> issue.getId().equals(issueId)), "Issue should be in the issue list");
    }

    @Test
    public void testAddVote() {
        Vote vote = new Vote();
        Vote result = sessionService.addVote(vote);

        assertNotNull(result);
        // Ajoutez d'autres vérifications si nécessaire
    }

    @Test
    public void testGetAllVotes() {

         List<Vote> testVotes;
        testVotes = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            Vote vote = new Vote();
            vote.setValue(i);
            testVotes.add(voteRepository.save(vote));
        }
        // Call the method to test
        List<Vote> votes = sessionService.getAllVotes();

        // Assertions
        assertNotNull(votes, "Votes should not be null");
        assertEquals(testVotes.size(), votes.size(), "The number of votes should match the number of test votes");

        for (Vote testVote : testVotes) {
            assertTrue(votes.stream()
                            .anyMatch(vote -> vote.getId().equals(testVote.getId())),
                    "All test votes should be present in the result list");
        }
    }



}
