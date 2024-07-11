package com.spo.app.controller;

import com.spo.app.entity.Session;
import com.spo.app.entity.User;
import com.spo.app.services.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserRestController {
    @Autowired
    IUserService userService;
    @GetMapping("/retrieve-all-users")
    @ResponseBody
    public List<User> getUsers() {
        List<User> listUsers = userService.retrieveUsers();
        return listUsers;
    }
}
