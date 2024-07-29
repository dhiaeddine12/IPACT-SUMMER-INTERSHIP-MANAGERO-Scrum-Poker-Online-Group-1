package com.spo.app.services;

import com.spo.app.entity.Issue;
import com.spo.app.entity.Session;

import java.util.List;
import java.util.Optional;

public interface ISessionService {
    public Session addSession(Session session);

    public List<Session> retrieveSessions();

    public Session retrieveoneSession(String id);

    public Session invite_users(String id_user, String id_session);
     Session ajouterIssues(String id_issue, String id_session);
    void sendEmail(String to, String subject, String text);
   // Optional<Session> GetsessionByToken(String token);
    List<Issue> GetsessionByToken(String token);
}

