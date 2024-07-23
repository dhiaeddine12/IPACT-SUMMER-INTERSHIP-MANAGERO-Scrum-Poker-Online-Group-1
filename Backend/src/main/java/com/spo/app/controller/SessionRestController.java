package com.spo.app.controller;
<<<<<<< HEAD
import com.spo.app.entity.Session;
import com.spo.app.services.ISessionService;
=======
<<<<<<< Updated upstream


import com.spo.app.entity.Session;
import com.spo.app.services.interfaces.ISessionService;
=======
import com.spo.app.entity.Session;
import com.spo.app.services.ISessionService;
>>>>>>> Stashed changes
>>>>>>> 9a0e8d7cd80e12fd230a4077d9e5fb9446455c9a
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
<<<<<<< HEAD
        Session session = sessionService.retrieveoneSession(id);
=======
<<<<<<< Updated upstream
       Session session = sessionService.retrieveoneSession(id);
=======
        Session session = sessionService.retrieveoneSession(id);
>>>>>>> Stashed changes
>>>>>>> 9a0e8d7cd80e12fd230a4077d9e5fb9446455c9a
        return session;
    }

    @PostMapping("/invite/{id_user}/{id_session}")
<<<<<<< HEAD
    @ResponseBody
=======
<<<<<<< Updated upstream
@ResponseBody
=======
    @ResponseBody
>>>>>>> Stashed changes
>>>>>>> 9a0e8d7cd80e12fd230a4077d9e5fb9446455c9a
    public Session addSession(@PathVariable("id_session") String id_session,@PathVariable("id_user") String id_projet)
    {
        Session session = sessionService.invite_users(id_projet,id_session);

        return session;
    }
}
