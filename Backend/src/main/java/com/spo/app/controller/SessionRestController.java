package com.spo.app.controller;
import com.spo.app.entity.Session;
import com.spo.app.services.ISessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SessionRestController {
    @Autowired
    ISessionService sessionService;
    // http://localhost:8088/Spring/etudiant/add-etudiant
    @PostMapping("/add_Session")
    @ResponseBody
    public Session addAnalyse(@RequestBody Session ae)
    {
        Session session = sessionService.addSession(ae);

        return session;
    }
    @GetMapping("/retrieve-all-Sessions")
    @ResponseBody
    public List<Session> getSessions() {
        List<Session> listAnalyse = sessionService.retrieveSessions();
        return listAnalyse;
    }

    @GetMapping("/retrieve-session/{id_session}")
    @ResponseBody
    public Session getSession_by_id(@PathVariable("id_session") String id) {
        Session session = sessionService.retrieveoneSession(id);
        return session;
    }

    @PostMapping("/invite/{id_user}/{id_session}")
    @ResponseBody
    public Session addSession(@PathVariable("id_session") String id_session,@PathVariable("id_user") String id_projet)
    {
        Session session = sessionService.invite_users(id_projet,id_session);

        return session;
    }
}
