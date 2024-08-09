package com.spo.app.services;

import com.spo.app.dao.IssueRepo;
import com.spo.app.dao.SessionRepository;
import com.spo.app.dao.UserRepository;
import com.spo.app.dao.VoteRepository;
import com.spo.app.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SessionService implements ISessionService {
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IssueRepo issueRepo;
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private VoteRepository voteRepository;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public Vote addVote(Vote vote) {
        Vote savedVote = voteRepository.save(vote);
        messagingTemplate.convertAndSend("/topic/votes", savedVote);
        return savedVote;
    }

    public List<Vote> getAllVotes() {
        return voteRepository.findAll();
    }

    @Override
    public Session addSession(Session session) {
        Date now = new Date();
        session.setToken(TokenGenerator.generateToken());
        session.setStart_date(now);
        session.setEnd_date(now);
        return sessionRepository.save(session);
    }

    @Override
    public List<Session> retrieveSessions() {
        return sessionRepository.findAll();
    }

    @Override
    public List<Issue> GetsessionByToken(String token) {
      Session s= sessionRepository.findByToken(token);
    //List<Issue> issues=s.getIssueList();
    return s.getIssueList();}

    @Override
    public Session retrieveoneSession(String id) {
        return sessionRepository.findById(id).orElse(null);
    }


    @Override
    public Session invite_users(String id_user, String id_session) {
        Session session = sessionRepository.findById(id_session).orElse(null);
        Date now = new Date();
        session.setStart_date(now);
        List<User> users = new ArrayList<>();
        User user = userRepository.findByEmail(id_user);
        users.add(user);
        session.setUserList(users);
        return sessionRepository.save(session);
    }

    @Override
    public Session ajouterIssues(String id_issue, String id_session) {
        Session session = sessionRepository.findById(id_session).orElse(null);
        Issue issue = issueRepo.findById(id_issue).orElse(null);
        List<Issue> issues = session.getIssueList();
        if (issues == null) {
            issues = new ArrayList<>();
        }

        // Add the new issue to the existing list
        issues.add(issue);
        session.setIssueList(issues);

        return sessionRepository.save(session);
    }

    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        javaMailSender.send(message);
    }
}
