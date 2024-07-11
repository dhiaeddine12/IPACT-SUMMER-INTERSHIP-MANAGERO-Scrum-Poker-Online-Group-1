package com.spo.app.services.interfaces;

import com.spo.app.entity.Session;

import java.util.List;

public interface ISessionService {
    public Session addSession(Session session);
public List<Session> retrieveSessions();
public  Session retrieveoneSession(String id);
public Session invite_users(String id_user,String id_session);



}
