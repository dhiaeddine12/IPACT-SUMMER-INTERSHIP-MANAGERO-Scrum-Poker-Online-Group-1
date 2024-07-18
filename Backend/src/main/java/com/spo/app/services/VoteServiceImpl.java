package com.spo.app.services;

import com.spo.app.dao.CreateGameRepository;
import com.spo.app.dao.VoteRepository;
import com.spo.app.entity.Vote;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
@CrossOrigin(origins = "*")

@Service
@AllArgsConstructor
public class VoteServiceImpl implements  IVoteService{

    private VoteRepository voteRepository ;
    @Override
    public Vote addVote(Vote vote) {
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
}
