package com.spo.app.services;

import com.spo.app.dao.IssueRepo;
import com.spo.app.dao.SessionRepository;
import com.spo.app.dao.VoteRepository;
import com.spo.app.entity.Issue;
import com.spo.app.entity.KpiData;
import com.spo.app.entity.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KPI {

    @Autowired
    private VoteRepository voteRepository;
    @Autowired
    private IssueRepo issueRepository;
    @Autowired
    private SessionRepository sessionRepository;

    public KpiData getKpiData() {
        long totalVotes = voteRepository.count();
        long totalIssues = issueRepository.count();
        long totalSessions = sessionRepository.count();
        double averageIssuesPerSession = totalIssues / (double) totalSessions;


        // long activeSessions = sessionRepository.(); // Exemple, ajouter méthode dans le repo

        return new KpiData(totalVotes, totalIssues,totalSessions,averageIssuesPerSession);
    }




}
