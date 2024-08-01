package com.spo.app.controller;

import com.spo.app.dao.VoteRepository;
import com.spo.app.entity.Creategame;
import com.spo.app.entity.Vote;
import com.spo.app.services.VoteServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Tag(name = "Web Services pour vote ")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
@RestController
public class VoteController {

    VoteServiceImpl voteService;
    @Autowired
    VoteRepository voteRepository;

    @GetMapping("/getvote_issue/{title}")
    public ResponseEntity<?> GetAllByTickets(@PathVariable("title") String title){
        return this.voteService.GetAllVoteByTickets(title) ;
    }
    @GetMapping("/vote_statistics/{issueTitle}")
    public ResponseEntity<?> getVoteStatistics(@PathVariable String issueTitle) {
        List<Vote> votes = voteRepository.findAllByIssueTitle(issueTitle);

        Map<Integer, Long> voteCountsByValue = votes.stream()
                .collect(Collectors.groupingBy(Vote::getValue, Collectors.counting()));

        return ResponseEntity.status(HttpStatus.OK).body(voteCountsByValue);
    }
    @PostMapping("/add_vote/{issue_id}/{session_id}")
    public Vote addVote(@RequestBody Vote vote,@PathVariable("session_id") String  session_id,@PathVariable("issue_id") String  issue_title) {
        return voteService.addVote(vote,issue_title,session_id);
    }

    @PutMapping("/modify-vote")
    public Vote updateVote(@RequestBody Vote vote) {
        return voteService.updateVote(vote);
    }

    @DeleteMapping("/remove-vote/{vote-id}")
    public void deleteVote(@PathVariable("vote-id")
                               String  VoteId) {
        voteService.deleteVote(VoteId);
    }

    @Operation(description = "Return an vote!")
    @GetMapping("/retrieve-vote/{vote-id}")
    public Vote getVote(@PathVariable("vote-id") String  VoteId) {
        return voteService.retrieveVote(VoteId);
    }

    @GetMapping("/retrieve-all-votes")
    public List<Vote> getVotes() {
        return voteService.retrieveAllVote();
    }
}
