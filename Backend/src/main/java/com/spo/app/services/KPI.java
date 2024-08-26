package com.spo.app.services;

import com.spo.app.dao.IssueRepo;
import com.spo.app.dao.ProjectRepo;
import com.spo.app.dao.SessionRepository;
import com.spo.app.dao.VoteRepository;
import com.spo.app.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;

@Service
public class KPI {

    @Autowired
    private VoteRepository voteRepository;
    @Autowired
    private IssueRepo issueRepository;
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private ProjectRepo projectRepo;

    public KpiData getKpiData() {
        long totalVotes = voteRepository.count();
        long totalIssues = issueRepository.count();
        long totalSessions = sessionRepository.count();
        double averageIssuesPerSession = totalIssues / (double) totalSessions;
        long totalProjects = projectRepo.count();

        // long activeSessions = sessionRepository.(); // Exemple, ajouter méthode dans le repo

        return new KpiData(totalVotes, totalIssues,totalSessions,averageIssuesPerSession, totalProjects);
    }
    public List<Issue> getIssuesByProjectId(@PathVariable String projectId) {
        Project project = projectRepo.findById(projectId).orElse(null);
        List<Issue> issues=new ArrayList<>();
        System.out.println("job"+project.getIssueIds().size());
        for(String id:project.getIssueIds())
        {
            Issue issue=issueRepository.findById(id).orElse(null);
            System.out.println("job"+issue);
            issues.add(issue);
            System.out.println("job2"+issues);
        }

        return issues;

    }

    public Float Pourcentage_avancement(String id_projet) {
        Float pourcentage = 0F;
        int nb_complete = 0;

        // Récupère les issues du projet
        List<Issue> issues = this.getIssuesByProjectId(id_projet);
        System.out.println("Nombre total d'issues : " + issues.size());

        // Compte le nombre d'issues complétés
        for (Issue i : issues) {
            if (i.getStatus() == StatusI.COMPLETED) {
                nb_complete++;
                System.out.println("Issue complétée : " + i.getStatus());
            }
        }

        // Calcul du pourcentage
        if (!issues.isEmpty()) { // S'assurer qu'il y a des issues pour éviter la division par zéro
            pourcentage = (float) nb_complete / issues.size() * 100;
        }
        System.out.println("Pourcentage d'avancement : " + pourcentage + "%");

        return pourcentage;
    }




}
