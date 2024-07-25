package com.spo.app.services;
import com.spo.app.dao.IssueRepo;
import com.spo.app.dao.SessionRepository;
import com.spo.app.dao.UserRepository;
import com.spo.app.entity.Issue;
import com.spo.app.entity.Session;
import com.spo.app.entity.TokenGenerator;
import com.spo.app.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SessionService implements ISessionService {
    @Autowired
    SessionRepository sessionRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    IssueRepo issueRepo;
    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public Session addSession(Session session) {

        Date now = new Date();
        session.setToken(TokenGenerator.generateToken());
        session.setStart_date(now);
        session.setStart_date(now);
        return sessionRepository.save(session);
    }

    @Override
    public List<Session> retrieveSessions() {
        List<Session> ls=sessionRepository.findAll();
        System.out.println("khalil"+ls.size());
        for(Session s:ls){
            System.out.println("jobjob"+s.toString());
        }
        return sessionRepository.findAll();

    }
    @Override
    public Optional<Session> GetsessionByToken(String token)
    {
        return sessionRepository.findByToken(token);
    }


    @Override
    public Session retrieveoneSession(String id) {
        return sessionRepository.findById(id).orElse(null);
    }

    @Override
    public Session invite_users(String id_user,String id_session) {
        Session session=sessionRepository.findById(id_session).orElse(null);
        Date now = new Date();
        session.setStart_date(now);
        List<User> users=new ArrayList<>();
        User user=userRepository.findByEmail(id_user);
        users.add(user);
        session.setUserList(users);
        return sessionRepository.save(session);
    }

    @Override
    public Session ajouterIssues(String id_issue, String id_session) {
        Session session=sessionRepository.findById(id_session).orElse(null);
        List<Issue> issues=new ArrayList<>();
        Issue issue=issueRepo.findById(id_issue).orElse(null);
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
