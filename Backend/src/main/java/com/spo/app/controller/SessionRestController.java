package com.spo.app.controller;
import com.spo.app.entity.Issue;
import com.spo.app.entity.KpiData;
import com.spo.app.entity.Session;
import com.spo.app.services.ISessionService;
import com.spo.app.services.KPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SessionRestController {
    @Autowired
    ISessionService sessionService;

    @Autowired
    private KPI kpiService;
    // http://localhost:8088/Spring/etudiant/add-etudiant
    @PostMapping("/add_Session")
    @ResponseBody
    public Session addSession(@RequestBody Session ae)
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
    public Session invite_user(@PathVariable("id_session") String id_session,@PathVariable("id_user") String id_projet)
    {
        Session session = sessionService.invite_users(id_projet,id_session);

        return session;
    }
    @PostMapping("/ajouter_issues/{id_issue}/{id_session}")
    @ResponseBody
    public Session ajouter_issues(@PathVariable("id_session") String id_session,@PathVariable("id_issue") String id_issue)
    {
        Session session = sessionService.ajouterIssues(id_issue,id_session);

        return session;
    }

    @GetMapping("/room/{token}")
    public List<Issue> getSessionByToken(@PathVariable("token") String token) {
        return sessionService.GetsessionByToken(token);
    }
    @PostMapping("/mail")
    public Session createSession(@RequestParam String email,@RequestBody Session ae) {
        Session session = sessionService.addSession(ae);
        String link = "http://localhost:4200/pages/room/" + session.getToken();
        sessionService.sendEmail(email, "Join the session", "Click the link to join the session: " + link);
        return session;
    }


    @RequestMapping("/kpis")
    @GetMapping
    public ResponseEntity<KpiData> getKpiData() {
        KpiData kpiData = kpiService.getKpiData();
        return ResponseEntity.ok(kpiData);
    }

    @GetMapping("/top-three-by-average-vote")
    public ResponseEntity<List<Issue>> getTopThreeIssuesByAverageVote() {
        List<Issue> topIssues = sessionService.getTopThreeIssuesByAverageVote();
        return ResponseEntity.ok(topIssues);
    }
}
