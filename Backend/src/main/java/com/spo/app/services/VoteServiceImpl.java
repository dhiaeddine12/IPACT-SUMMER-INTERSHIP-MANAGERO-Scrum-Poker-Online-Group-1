package com.spo.app.services;

import com.spo.app.dao.CreateGameRepository;
import com.spo.app.dao.IssueRepo;
import com.spo.app.dao.SessionRepository;
import com.spo.app.dao.VoteRepository;
import com.spo.app.entity.Issue;
import com.spo.app.entity.Session;
import com.spo.app.entity.Vote;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")

@Service
@AllArgsConstructor
public class VoteServiceImpl implements  IVoteService{
@Autowired
    private VoteRepository voteRepository ;
@Autowired
    private IssueRepo issueRepo;
@Autowired
private SessionRepository sessionRepository;

    @Override
    public Vote addVote(Vote vote,String issue_title,String id_session) {
        Session session=sessionRepository.findByToken(id_session);
        Issue issue=issueRepo.findByTitle(issue_title);
        vote.setSession(session);
        vote.setIssue(issue);
        return voteRepository.save(vote);
    }

    @Override
    public Vote updateVote(Vote vote) {
        return voteRepository.save(vote);
    }

    @Override
    public void deleteVote(String  id) {
        voteRepository.deleteById(id);
    }

    @Override
    public Vote retrieveVote(String  VoteId) {
        return voteRepository.findById(VoteId).get();
    }

    @Override
    public List<Vote> retrieveAllVote() {
        return voteRepository.findAll();
    }


    @Override
    public ResponseEntity<?> GetAllVoteByTickets(String title) {
        List<Vote> votes = voteRepository.findAllByIssueTitle(title);

        Map<String, Integer> voteCountsByComplexity = new HashMap<>();
        for (Vote vote : votes) {
            voteCountsByComplexity.put(title,vote.getValue());
        }
        return ResponseEntity.status(HttpStatus.OK).body(voteCountsByComplexity);
    }
}
