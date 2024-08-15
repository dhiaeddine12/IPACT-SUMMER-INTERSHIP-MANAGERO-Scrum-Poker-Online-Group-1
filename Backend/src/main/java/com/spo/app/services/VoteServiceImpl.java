package com.spo.app.services;

import com.spo.app.dao.*;
import com.spo.app.entity.Issue;
import com.spo.app.entity.Session;
import com.spo.app.entity.User;
import com.spo.app.entity.Vote;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.Console;
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
    @Autowired
    private UserRepository userRepository;

    @Override
    public Vote addVote(Vote vote, String issue_title, String id_session, String username) {
        // Get the current authenticated principal
      /*  Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Determine the type of principal and extract the username
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else if (principal instanceof String) {
            username = (String) principal;
        } else {
            throw new IllegalStateException("Unexpected principal type: " + principal.getClass());
        }*/

        // For debugging

        // Fetch the user, session, and issue based on provided information
        User user = userRepository.findByUsername(username);
        System.out.println("jobjob: " + user);

        Session session = sessionRepository.findByToken(id_session);
        Issue issue = issueRepo.findByTitle(issue_title);
        System.out.println("jobjob331: " +session);
        System.out.println("jobjob332: " +issue);

        // Associate the vote with the session, issue, and user
        vote.setSession(session);
        vote.setIssue(issue);
        vote.setUser(user);
        System.out.println("jobjob31: " +session);
        System.out.println("jobjob32: " +issue);
        // Save the vote to the repository
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
