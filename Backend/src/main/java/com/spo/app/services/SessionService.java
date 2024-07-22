package com.spo.app.services;
import com.spo.app.dao.SessionRepository;
import com.spo.app.dao.UserRepository;
import com.spo.app.entity.Session;
import com.spo.app.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class SessionService implements ISessionService {
    @Autowired
    SessionRepository sessionRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public Session addSession(Session session) {

        Date now = new Date();
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
}
