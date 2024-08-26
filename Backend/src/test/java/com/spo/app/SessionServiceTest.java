package com.spo.app;

import com.spo.app.dao.IssueRepo;
import com.spo.app.dao.SessionRepository;
import com.spo.app.dao.UserRepository;
import com.spo.app.dao.VoteRepository;
import com.spo.app.entity.Issue;
import com.spo.app.entity.Session;
import com.spo.app.entity.User;
import com.spo.app.entity.Vote;
import com.spo.app.services.SessionService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class SessionServiceTest {

    @Mock
    private SessionRepository sessionRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private IssueRepo issueRepo;
    @Mock
    private JavaMailSender javaMailSender;
    @Mock
    private VoteRepository voteRepository;
    @Mock
    private SimpMessagingTemplate messagingTemplate;

    @InjectMocks
    private SessionService sessionService;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddSession() {
        Session session = new Session();
        when(sessionRepository.save(any(Session.class))).thenReturn(session);

        Session result = sessionService.addSession(session);

        assertNotNull(result);
        verify(sessionRepository, times(1)).save(session);
    }

    @Test
    public void testRetrieveSessions() {
        List<Session> sessions = new ArrayList<>();
        when(sessionRepository.findAll()).thenReturn(sessions);

        List<Session> result = sessionService.retrieveSessions();

        assertNotNull(result);
        verify(sessionRepository, times(1)).findAll();
    }

    @Test
    public void testGetSessionByToken() {
        // Préparation des données
        Session session = new Session();
        session.setToken("ROg73uWc6HfS75a7QizJwF6Ap4kYINg5");

        // Création d'une liste d'issues simulée
        List<Issue> issues = new ArrayList<>();
        issues.add(new Issue()); // Ajoutez des issues si nécessaire

        session.setIssueList(issues); // Assurez-vous que IssueList est initialisé

        // Configuration du mock
        when(sessionRepository.findByToken("ROg73uWc6HfS75a7QizJwF6Ap4kYINg5")).thenReturn(session);

        // Appel de la méthode à tester
        List<Issue> result = sessionService.GetsessionByToken("ROg73uWc6HfS75a7QizJwF6Ap4kYINg5");

        // Vérifications
        assertNotNull(result);
        assertEquals(issues.size(), result.size()); // Vérifiez que la taille des listes est correcte
        verify(sessionRepository, times(1)).findByToken("ROg73uWc6HfS75a7QizJwF6Ap4kYINg5");
    }


    @Test
    public void testRetrieveOneSession() {
        Session session = new Session();
        when(sessionRepository.findById("testId")).thenReturn(Optional.of(session));

        Session result = sessionService.retrieveoneSession("testId");

        assertNotNull(result);
        verify(sessionRepository, times(1)).findById("testId");
    }

    @Test
    public void testInviteUsers() {
        Session session = new Session();
        session.setUserList(new ArrayList<>());
        User user = new User();
        when(sessionRepository.findById("sessionId")).thenReturn(Optional.of(session));
        when(userRepository.findByEmail("userEmail")).thenReturn(user);
        when(sessionRepository.save(any(Session.class))).thenReturn(session);

        Session result = sessionService.invite_users("userEmail", "sessionId");

        assertNotNull(result);
        assertTrue(result.getUserList().contains(user));
        verify(sessionRepository, times(1)).save(session);
    }

    @Test
    public void testAjouterIssues() {
        Session session = new Session();
        session.setIssueList(new ArrayList<>());
        Issue issue = new Issue();
        when(sessionRepository.findById("sessionId")).thenReturn(Optional.of(session));
        when(issueRepo.findById("issueId")).thenReturn(Optional.of(issue));
        when(sessionRepository.save(any(Session.class))).thenReturn(session);

        Session result = sessionService.ajouterIssues("issueId", "sessionId");

        assertNotNull(result);
        assertTrue(result.getIssueList().contains(issue));
        verify(sessionRepository, times(1)).save(session);
    }

    @Test
    public void testAddVote() {
        Vote vote = new Vote();
        when(voteRepository.save(any(Vote.class))).thenReturn(vote);

        Vote result = sessionService.addVote(vote);

        assertNotNull(result);
        verify(voteRepository, times(1)).save(vote);
        verify(messagingTemplate, times(1)).convertAndSend("/topic/votes", vote);
    }

    @Test
    public void testGetAllVotes() {
        List<Vote> votes = new ArrayList<>();
        when(voteRepository.findAll()).thenReturn(votes);

        List<Vote> result = sessionService.getAllVotes();

        assertNotNull(result);
        verify(voteRepository, times(1)).findAll();
    }
}
