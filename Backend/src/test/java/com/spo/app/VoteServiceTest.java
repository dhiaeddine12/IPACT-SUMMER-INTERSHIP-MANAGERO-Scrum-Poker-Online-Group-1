package com.spo.app;
import com.spo.app.dao.IssueRepo;
import com.spo.app.dao.SessionRepository;
import com.spo.app.dao.VoteRepository;
import com.spo.app.entity.Issue;
import com.spo.app.entity.Session;
import com.spo.app.entity.Vote;
import com.spo.app.services.VoteServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
public class VoteServiceTest {

    @Mock
    private VoteRepository voteRepository;

    @Mock
    private IssueRepo issueRepo;

    @Mock
    private SessionRepository sessionRepository;

    @InjectMocks
    private VoteServiceImpl voteService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddVote() {
        Vote vote = new Vote();
        Session session = new Session();
        Issue issue = new Issue();
        String issueTitle = "issue-title";
        String sessionId = "session-id";

        when(sessionRepository.findByToken(sessionId)).thenReturn(session);
        when(issueRepo.findByTitle(issueTitle)).thenReturn(issue);
        when(voteRepository.save(vote)).thenReturn(vote);

        Vote savedVote = voteService.addVote(vote, issueTitle, sessionId);

        assertEquals(vote, savedVote);
        assertEquals(session, vote.getSession());
        assertEquals(issue, vote.getIssue());

        verify(sessionRepository, times(1)).findByToken(sessionId);
        verify(issueRepo, times(1)).findByTitle(issueTitle);
        verify(voteRepository, times(1)).save(vote);
    }

    @Test
    void testUpdateVote() {
        Vote vote = new Vote();

        when(voteRepository.save(vote)).thenReturn(vote);

        Vote updatedVote = voteService.updateVote(vote);

        assertEquals(vote, updatedVote);
        verify(voteRepository, times(1)).save(vote);
    }

    @Test
    void testDeleteVote() {
        String voteId = "some-id";

        doNothing().when(voteRepository).deleteById(voteId);

        voteService.deleteVote(voteId);

        verify(voteRepository, times(1)).deleteById(voteId);
    }

    @Test
    void testRetrieveVote() {
        String voteId = "some-id";
        Vote vote = new Vote();

        when(voteRepository.findById(voteId)).thenReturn(Optional.of(vote));

        Vote retrievedVote = voteService.retrieveVote(voteId);

        assertEquals(vote, retrievedVote);
        verify(voteRepository, times(1)).findById(voteId);
    }

    @Test
    void testRetrieveAllVote() {
        Vote vote1 = new Vote();
        Vote vote2 = new Vote();
        List<Vote> expectedVotes = Arrays.asList(vote1, vote2);

        when(voteRepository.findAll()).thenReturn(expectedVotes);

        List<Vote> actualVotes = voteService.retrieveAllVote();

        assertEquals(expectedVotes, actualVotes);
        verify(voteRepository, times(1)).findAll();
    }

    @Test
    void testGetAllVoteByTickets() {
        String title = "issue-title";
        Vote vote = new Vote();
        vote.setValue(5);
        List<Vote> votes = Arrays.asList(vote);

        when(voteRepository.findAllByIssueTitle(title)).thenReturn(votes);

        ResponseEntity<?> response = voteService.GetAllVoteByTickets(title);
        @SuppressWarnings("unchecked")
        Map<String, Integer> resultMap = (Map<String, Integer>) response.getBody();

        assertEquals(1, resultMap.size());
        assertEquals(5, resultMap.get(title));
        verify(voteRepository, times(1)).findAllByIssueTitle(title);
    }
}
