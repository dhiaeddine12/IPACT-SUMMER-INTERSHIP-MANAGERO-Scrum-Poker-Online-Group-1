package com.spo.app.services;

import com.spo.app.entity.Creategame;
import com.spo.app.entity.Vote;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
@CrossOrigin(origins = "*")
public interface IVoteService {

    public Vote addVote(Vote vote,String id_issue,String id_session);

    public Vote updateVote (Vote vote);

    void deleteVote(String  id);

    public Vote retrieveVote(String  VoteId);
    List<Vote> retrieveAllVote();
     ResponseEntity<?> GetAllVoteByTickets(String title);
}
