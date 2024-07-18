package com.spo.app.controller;

import com.spo.app.entity.Creategame;
import com.spo.app.entity.Vote;
import com.spo.app.services.VoteServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Web Services pour vote ")
@CrossOrigin(origins = "*")
@AllArgsConstructor
@RequestMapping("/vote")
@RestController
public class VoteController {

    VoteServiceImpl voteService;


    @PostMapping("/add_vote")
    public Vote addVote(@RequestBody Vote vote) {
        return voteService.addVote(vote);
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
